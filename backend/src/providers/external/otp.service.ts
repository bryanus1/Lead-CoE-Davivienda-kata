import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class OtpService {
  async valid(userId: number, otp: string): Promise<boolean> {
    const data = fs.readFileSync(
      '/Users/bsanjuan/Documents/Lead-CoE-Davivienda-kata/backend/src/providers/external/json/otp.json',
      'utf-8',
    );
    const res = JSON.parse(data);

    const challenge = (
      res.challenges as { userId: number; otp: string }[]
    ).find((challenge) => challenge.userId === userId && challenge.otp === otp);

    return challenge !== undefined;
  }
}
