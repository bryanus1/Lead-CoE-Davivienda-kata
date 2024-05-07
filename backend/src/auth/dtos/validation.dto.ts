import { IsOptional, IsObject, IsNumber, IsPositive } from 'class-validator';

export class ValidationDTO {
  @IsNumber()
  @IsPositive()
  userId: number;

  @IsObject()
  @IsOptional()
  otp?: {
    token: string;
  };

  @IsObject()
  @IsOptional()
  product?: {
    documentNumber: number;
    documentType: string;
    productNumber: number;
    keyProduct: string;
  };

  @IsObject()
  @IsOptional()
  wordCombination?: {
    word: string;
    phrase: string;
    key: string;
  };
}
