import jwt, { Secret } from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

import UserDto from '../dtos/user-dto';

const prisma = new PrismaClient();

// добавить сохранение на нескольких устройствах

class TokenService {
  generationTokens(payload: UserDto) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET as Secret, { expiresIn: '15m' });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET as Secret, { expiresIn: '30d' });

    return { accessToken, refreshToken };
  }

  validateAccessToken(token: string) {
    try {
      const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET as string);
      return userData;
    } catch (e) {
      return null;
    }
  }

  validateRefreshToken(token: string) {
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET as string);
      return userData;
    } catch (e) {
      return null;
    }
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

  async removeToken(refreshToken: string) {
    await prisma.token.delete({
      where: { refreshToken },
    });
  }

  async findToken(refreshToken: string) {
    const tokenData = await prisma.token.findUnique({
      where: { refreshToken },
    });

    return tokenData;
  }
}

export default new TokenService();
