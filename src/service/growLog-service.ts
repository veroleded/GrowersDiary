import { PrismaClient } from '@prisma/client';
import GrowLogDto from '../dtos/growLog-dto';
import { PostGrowLogPayload, UpdateGrowLogPayload } from '../interfaces/growLogPayload';
import ApiError from '../exceptions/api-errors';

const prisma = new PrismaClient();

class GrowLog {
  async getAllOwnerGrowLogs(ownerId: number) {
    const growLogs = await prisma.growLog.findMany({
      where: { ownerId },
    });

    const growLogsDtos = growLogs.map((log) => new GrowLogDto(log));

    return growLogsDtos;
  }

  async createGrowLog(payload: PostGrowLogPayload) {
    const growLog = await prisma.growLog.create({
      data: { ...payload },
    });

    const growLogDto = new GrowLogDto(growLog);

    return growLogDto;
  }

  async getOne(ownerId: number, id: number) {
    const growLog = await prisma.growLog.findUnique({
      where: { id },
    });

    if (!growLog) {
      throw ApiError.BadRequest('GrowLog is missing from the database');
    }

    if (growLog.ownerId !== ownerId) {
      throw ApiError.BadRequest('No access rights');
    }

    const growLogDto = new GrowLogDto(growLog);

    return growLogDto;
  }

  async updateOne(payload: UpdateGrowLogPayload, id: number, ownerId: number) {
    const condidate = await prisma.growLog.findUnique({ where: { id } });

    if (!condidate) {
      throw ApiError.BadRequest('GrowLog is missing from the database');
    }

    if (condidate.ownerId !== ownerId) {
      throw ApiError.BadRequest('No access rights');
    }

    const growLog = await prisma.growLog.update({
      where: { id },
      data: {
        ...payload,
      },
    });

    const growLogDto = new GrowLogDto(growLog);

    return growLogDto;
  }

  async deleteOne(ownerId: number, id: number) {
    const candidate = await prisma.growLog.findUnique({
      where: { id },
    });

    if (!candidate) {
      throw ApiError.BadRequest('GrowLog is missing from the database');
    }

    if (candidate.ownerId !== ownerId) {
      throw ApiError.BadRequest('No access rights');
    }

    await prisma.growLog.delete({
      where: { id },
    });
  }
}

export default new GrowLog();
