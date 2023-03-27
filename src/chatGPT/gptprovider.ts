/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from 'openai';

@Injectable()
export class GPTProviderService {
  private readonly openai: OpenAIApi;
  private readonly configuration;
  constructor() {
    this.configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY || '',
    });
    this.openai = new OpenAIApi(this.configuration);
  }

  async askGPT(question: string): Promise<string> {
    const questionPreps: ChatCompletionRequestMessage[] = [
      { role: 'user', content: question },
      { role: 'assistant', content: 'ChatGPT response here...' },
    ];
    if (!this.configuration.apiKey) {
      return 'OpenAI API key not configured, please follow instructions in README.md';
    }
    if (question.length === 0) {
      return 'Please enter a valid question';
    }

    return await this.openai
      .createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: questionPreps,
      })
      .then((result) => {
        console.log('return ------------------------', result.data);
        return result.data.choices[0].message.content;
      })
      .catch((err) => {
        return 'Later ....';
      });
  }
}
