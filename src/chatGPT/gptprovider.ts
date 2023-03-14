/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { Configuration, OpenAIApi } from 'openai';

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
        temperature: 0.9,
        max_tokens: 150,
        top_p: 1,
        frequency_penalty: 0.0,
        presence_penalty: 0.6,
        stop: [' Human:', ' AI:'],
      })
      .then((result) => {
        console.log('return ------------------------', result.data);
        return result.data.choices[0].text;
      })
      .catch((err) => {
        return 'Later ....';
      });
  }
}
