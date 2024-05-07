import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class ProductService {
  async valid(
    userId: number,
    product: {
      documentNumber: number;
      documentType: string;
      productNumber: number;
      keyProduct: string;
    },
  ): Promise<boolean> {
    const data = fs.readFileSync(
      '/Users/bsanjuan/Documents/Lead-CoE-Davivienda-kata/backend/src/providers/external/json/product.json',
      'utf-8',
    );
    const res = JSON.parse(data);

    const challenge = (
      res.challenges as {
        userId: number;
        documentNumber: number;
        documentType: string;
        productNumber: number;
        keyProduct: string;
      }[]
    ).find(
      (challenge) =>
        challenge.userId === userId &&
        challenge.documentNumber === product.documentNumber &&
        challenge.documentType === product.documentType &&
        challenge.keyProduct === product.keyProduct &&
        challenge.productNumber === product.productNumber,
    );

    return challenge !== undefined;
  }
}
