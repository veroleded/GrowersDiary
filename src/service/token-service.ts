import jwt, { Secret } from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

import { Model } from '../dtos/user-dto';

const prisma = new PrismaClient();

class TokenService {
  generationTokens(payload: Model) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET as Secret, { expiresIn: '30m' });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET as Secret, { expiresIn: '30d' });

    return { accessToken, refreshToken };
  }

  async saveRefreshToken(userId: number, refreshToken: string) {
    const oldTokenData = await prisma.token.findFirst({
      where: { userId },
    });

    if (oldTokenData) {
      const updateOldTokenData = await prisma.token.update({
        where: { id: oldTokenData.id },
        data: {
          refreshToken,
        },
      });

      return updateOldTokenData;
    }

    const tokenData = await prisma.token.create({
      data: {
        userId,
        refreshToken,
      },
    });

    return tokenData;
  }
}

export default new TokenService();
