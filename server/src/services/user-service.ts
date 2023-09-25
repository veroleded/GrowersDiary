import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { User } from '@prisma/client';

import mailService from './mail-service';
import tokenService from './token-service';
import UserDto from '../dtos/user-dto';
import ApiError from '../exceptions/api-errors';

const prisma = new PrismaClient();

// вынести дублирующийся код в отдельные функции

class UserService {
  async registration(name: string, email: string, password: string) {
    const candidate = await prisma.user.findUnique({
      where: { email },
    });

    if (candidate) {
      throw ApiError.BadRequest('A user with this email address already exists', );
    }

    const hashPassword = await bcrypt.hash(password, 3);
    const activationLink = uuidv4();
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashPassword,
        activationLink: `${process.env.API_URL}/apiv1/auth/activate/${activationLink}`,
      },
    });

    await mailService.sendActivationMail(user.email, user.activationLink as string);

    const userDto = new UserDto(user);
    const tokens = tokenService.generationTokens({ ...userDto });
    await tokenService.saveRefreshToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }

  async activate(activationLink: string) {
    const user = await prisma.user.findFirst({
      where: { activationLink: `${process.env.API_URL}/apiv1/auth/activate/${activationLink}` },
    });

    if (!user) {
      throw ApiError.BadRequest('Invalid activation link');
    }

    // Добавить обработку если активация уже сделана

    await prisma.user.update({
      where: { id: user.id },
      data: {
        isActivated: true,
      },
    });
  }

  async login(email: string, password: string) {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw ApiError.BadRequest('Invalid login or password');
    }

    const isPassEquals = await bcrypt.compare(password, user.password);

    if (!isPassEquals) {
      throw ApiError.BadRequest('Invalid login or password');
    }

    const userDto = new UserDto(user);
    const tokens = tokenService.generationTokens({ ...userDto });
    await tokenService.saveRefreshToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }

  async logout(refreshToken: string) {
    await tokenService.removeToken(refreshToken);
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw ApiError.UnautharizedError();
    }

    const userData = tokenService.validateRefreshToken(refreshToken as string);
    const tokenFromDb = tokenService.findToken(refreshToken as string);

    if (!userData || !tokenFromDb) {
      throw ApiError.UnautharizedError();
    }

    const user = await prisma.user.findUnique({
      where: { id: (userData as UserDto).id },
    });

    const userDto = new UserDto(user as User);
    const tokens = tokenService.generationTokens({ ...userDto });

    await tokenService.saveRefreshToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }

  async getAllUsers() {
    const users = await prisma.user.findMany();
    return users;
  }
}

export default new UserService();
