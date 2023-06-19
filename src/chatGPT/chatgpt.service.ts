/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { ResponseDto } from 'src/common/response.dto';
import { GPTProviderService } from './gptprovider';

@Injectable()
export class ChatgptService {
  constructor(private readonly gPTProviderService: GPTProviderService) {}

  async askGPTAIStream(
    question: string,
  ): Promise<ResponseDto | PromiseLike<ResponseDto>> {
    return await this.gPTProviderService
      .askGPTDavinchi(question)
      .then((result) => {
        return {
          message: result,
        };
      });
  }

  /**
   * service level, we validate here
   * @param question
   * @returns asnwser from GPT
   */
  async askGPTAI(question: string): Promise<ResponseDto> {
    console.log(
      'last question ----------------------:',
      this.gPTProviderService.lastquestion,
    );
    return await this.gPTProviderService.askGPT(question).then((result) => {
      return {
        message: result,
      };
    });
  }
}
