import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

import mailService from './mail-service';
import tokenService from './token-service';
import UserDto from '../dtos/user-dto';

const prisma = new PrismaClient();

class UserService {
  async registration(name: string, email: string, password: string) {
    const candidate = await prisma.user.findUnique({
      where: { email },
    });

    if (candidate) {
      throw new Error('A user with this email address already exists');
    }

    const hashPassword = await bcrypt.hash(password, 3);
    const activationLink = uuidv4();
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashPassword,
        activationLink: `${process.env.API_URL}/api/activate/${activationLink}`,
      },
    });

    await mailService.sendActivationMail(user.email, user.activationLink as string);

    const userDto = new UserDto({ id: user.id, email: user.email, isActivated: user.isActivated });
    const tokens = tokenService.generationTokens({ ...userDto });

    await tokenService.saveRefreshToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }

  async activate(activationLink: string) {
    console.log(activationLink, `${process.env.API_URL}/api/activate/${activationLink}}`);
    const user = await prisma.user.findFirst({
      where: { activationLink: `${process.env.API_URL}/api/activate/${activationLink}` },
    });

    if (!user) {
      throw new Error('Invalid activation link');
    }

    // Добавить обработку если активация уже сделана 

    await prisma.user.update({
      where: { id: user.id },
      data: {
        isActivated: true,
      },
    });
  }
}

export default new UserService();
