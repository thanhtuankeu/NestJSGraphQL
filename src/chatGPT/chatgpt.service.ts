/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { ResponseDto } from 'src/common/response.dto';
import { GPTProviderService } from './gptprovider';

@Injectable()
export class ChatgptService {
  constructor(private readonly gPTProviderService: GPTProviderService) {}

  /**
   * service level, we validate here
   * @param question
   * @returns asnwser from GPT
   */
  async askGPTAI(question: string): Promise<ResponseDto> {
    return await this.gPTProviderService.askGPT(question).then((result) => {
      return {
        message: result,
      };
    });
  }
}
