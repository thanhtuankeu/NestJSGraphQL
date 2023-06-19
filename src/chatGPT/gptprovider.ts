/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import {
  ChatCompletionRequestMessage,
  ChatCompletionRequestMessageRoleEnum,
  Configuration,
  OpenAIApi,
} from 'openai';

@Injectable()
export class GPTProviderService {
  private readonly openai: OpenAIApi;
  private readonly configuration;
  questionPreps: ChatCompletionRequestMessage[] = [];
  lastQuestionTime = 0;
  questionLength = 3; // Magic number
  lastquestion;

  constructor() {
    this.configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY || 'sk',
    });
    this.openai = new OpenAIApi(this.configuration);
  }

  async askGPT(question: string): Promise<string> {
    this.questionPreps = this.pushQuestion(
      question,
      ChatCompletionRequestMessageRoleEnum.User,
      this.questionPreps,
    );
    if (!this.configuration.apiKey) {
      return 'OpenAI API key not configured, please follow instructions in README.md';
    }
    if (question.length === 0) {
      return 'Please enter a valid question';
    }

    return await this.openai
      .createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: this.questionPreps,
      })
      .then((result) => {
        console.log('return ------------------------', result.data);
        this.questionPreps = this.pushQuestion(
          result.data.choices[0].message.content,
          ChatCompletionRequestMessageRoleEnum.Assistant,
          this.questionPreps,
        );
        const lastquestion = result.data.choices[0].message.content;
        return lastquestion;
      })
      .catch((err) => {
        console.log('err---: ', err);
        return 'Later ....';
      });
  }

  async askGPTDavinchi(question: string): Promise<string> {
    if (!this.configuration.apiKey) {
      return 'OpenAI API key not configured, please follow instructions in README.md';
    }
    if (question.length === 0) {
      return 'Please enter a valid question';
    }

    return await this.openai
      .createCompletion({
        model: 'text-davinci-003',
        prompt: question,
        temperature: 0, // Higher values means the model will take more risks.
        max_tokens: 3000, // The maximum number of tokens to generate in the completion. Most models have a context length of 2048 tokens (except for the newest models, which support 4096).
        top_p: 1, // alternative to sampling with temperature, called nucleus sampling
        frequency_penalty: 0.5, // Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model's likelihood to repeat the same line verbatim.
        presence_penalty: 0, // Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far, increasing the model's likelihood to talk about new topics.
      })
      .then((result) => {
        console.log('return ------------------------', result.data);
        const lastquestion = result.data.choices[0].text;
        return lastquestion;
      })
      .catch((err) => {
        console.log('err---: ', err);
        return 'Later ....';
      });
  }

  /**
  This function takes in a message, type, and questionBank array and returns a new questionBank array with the new message object added to it.
  The message object contains a role and content property.
  The function also checks the last time a question was added to the questionBank and if it was more than 30 minutes ago, it removes all but the last 20 messages.
  If the questionBank array has more than 20 messages, it removes the first two messages.
  @param message - The message to be added to the questionBank array.
  @param type - The type of message (e.g. user or bot).
  @param questionBank - The array of messages to add the new message to.
  @returns A new questionBank array with the new message object added to it.
  */
  pushQuestion(
    message: string,
    type: string,
    questionBank: ChatCompletionRequestMessage[],
  ): ChatCompletionRequestMessage[] {
    const messageObj = {
      role: type as ChatCompletionRequestMessageRoleEnum,
      content: message,
    };

    const currentTime = Date.now();

    const questionBankCopy: ChatCompletionRequestMessage[] = [
      ...questionBank,
      messageObj,
    ];

    if (currentTime - this.lastQuestionTime > 5 * 60 * 1000) {
      questionBank = questionBank.splice(0, questionBankCopy.length);
      this.lastQuestionTime = currentTime;
    }

    if (questionBankCopy.length > this.questionLength) {
      questionBankCopy.splice(0, 2);
    }

    return questionBankCopy;
  }
}
