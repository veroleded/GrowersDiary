import { GrowLog, PrismaClient } from '@prisma/client';
import { PostLogEntryPayload, updateLogEntryPayload } from '../interfaces/logEntryPayload';
import LogEntryDto from '../dtos/logEntry-dto';
import ApiError from '../exceptions/api-errors';
import s3 from '../s3';
import AWS from 'aws-sdk'

const prisma = new PrismaClient();

// потестить загрузку фотографий

class LogEntryService {
  async getAll(growLogId: number) {
    const logEntries = await prisma.logEntry.findMany({
      where: { growLogId },
    });

    const logEntriesDtos = logEntries.map((entry) => new LogEntryDto(entry));

    return logEntriesDtos;
  }

  async createOne(payload: PostLogEntryPayload, buffer: Buffer | undefined) {
    let photo = null;
    if (buffer) {
      const upload = await s3.Upload({ buffer }, '/images/');
      if (!upload) {
        throw new Error('Failed to upload photo');
      } else {
        photo = (upload as AWS.S3.ManagedUpload.SendData).Location;
      }
    }

    const logEntry = await prisma.logEntry.create({
      data: { ...payload, photo },
    });

    const logEntryDto = new LogEntryDto(logEntry);

    return logEntryDto;
  }

  async getOne(id: number, ownerId: number) {
    const candidate = await prisma.logEntry.findUnique({
      where: { id },
    });

    if (!candidate) {
      throw ApiError.BadRequest("The entry doesn't exist");
    }

    const growLog = await prisma.growLog.findUnique({
      where: { id: candidate?.growLogId },
    });

    if ((growLog as GrowLog).ownerId !== ownerId) {
      throw ApiError.BadRequest('No access right');
    }

    const logEntryDto = new LogEntryDto(candidate);

    return logEntryDto;
  }

  async updateOne(payload: updateLogEntryPayload, buffer: Buffer | undefined, id: number, ownerId: number) {
    const candidate = await prisma.logEntry.findUnique({
      where: { id },
    });

    if (!candidate) {
      throw ApiError.BadRequest("The entry doesn't exist");
    }

    const growLog = await prisma.growLog.findUnique({
      where: { id: candidate?.growLogId },
    });

    if ((growLog as GrowLog).ownerId !== ownerId) {
      throw ApiError.BadRequest('No access right');
    }

    let photo = null;
    if (buffer) {
      const upload = await s3.Upload({ buffer }, '/images/');
      if (!upload) {
        throw new Error('Failed to upload photo');
      } else {
        photo = (upload as AWS.S3.ManagedUpload.SendData).Location;
      }
    }

    const logEntry = await prisma.logEntry.update({
      where: { id },
      data: { ...payload, photo },
    });

    const logEntryDto = new LogEntryDto(logEntry);

    return logEntryDto;
  }

  async deleteOne(id: number, ownerId: number) {
    const candidate = await prisma.logEntry.findUnique({
      where: { id },
    });

    if (!candidate) {
      throw ApiError.BadRequest("The entry doesn't exist");
    }

    const growLog = await prisma.growLog.findUnique({
      where: { id: candidate?.growLogId },
    });

    if ((growLog as GrowLog).ownerId !== ownerId) {
      throw ApiError.BadRequest('No access right');
    }

    await prisma.logEntry.delete({
      where: { id },
    });
  }
}

export default new LogEntryService();
