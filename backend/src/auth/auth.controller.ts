import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { SignInCommandHandler } from './command/sign-in.command.handler';
import { SignInCommand } from './command/sign-in.command';
import { ValidationDTO } from './dtos/validation.dto';
import { OtpService } from '@/providers/external/otp.service';
import { ProductService } from '@/providers/external/product.service';
import { WordCombinationService } from '@/providers/external/word-combination.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly signInCommandHandler: SignInCommandHandler,
    private otpService: OtpService,
    private productService: ProductService,
    private wordCombinationService: WordCombinationService,
  ) {}

  @Post('sign-in')
  signIn(@Body() credentials: SignInCommand): Promise<object> {
    return this.signInCommandHandler.signIn(credentials);
  }

  @Post('challenge')
  async validateChallenge(
    @Body() validationDTO: ValidationDTO,
  ): Promise<{ passedChallenge: boolean }> {
    if (validationDTO.otp) {
      return {
        passedChallenge: await this.otpService.valid(
          validationDTO.userId,
          validationDTO.otp.token,
        ),
      };
    }

    if (validationDTO.product) {
      return {
        passedChallenge: await this.productService.valid(
          validationDTO.userId,
          validationDTO.product,
        ),
      };
    }

    if (validationDTO.wordCombination) {
      return {
        passedChallenge: await this.wordCombinationService.valid(
          validationDTO.userId,
          validationDTO.wordCombination,
        ),
      };
    }

    throw new BadRequestException('challenge not provided');
  }
}
