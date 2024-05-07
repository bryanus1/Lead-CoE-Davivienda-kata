import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class WordCombinationService {
  async valid(
    userId: number,
    wordCombination: {
      word: string;
      phrase: string;
      key: string;
    },
  ): Promise<boolean> {
    const data = fs.readFileSync(
      '/Users/bsanjuan/Documents/Lead-CoE-Davivienda-kata/backend/src/providers/external/json/wordCombination.json',
      'utf-8',
    );
    const res = JSON.parse(data);

    const challenge = (
      res.challenges as {
        userId: number;
        word: string;
        phrase: string;
        key: string;
      }[]
    ).find(
      (challenge) =>
        challenge.userId === userId &&
        challenge.word === wordCombination.word &&
        challenge.phrase === wordCombination.phrase &&
        challenge.key === wordCombination.key,
    );

    return challenge !== undefined;
  }
}
