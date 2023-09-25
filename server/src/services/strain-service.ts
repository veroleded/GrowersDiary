import { PrismaClient, Strain } from '@prisma/client';
import { PostStrainPayload, UpdateStrainPayload } from '../interfaces/strainPayload';
import StrainDto from '../dtos/strain-dto';
import ApiError from '../exceptions/api-errors';

const prisma = new PrismaClient();

class StrainService {
  async getAll() {
    const strainsData = await prisma.strain.findMany();
    const strainsDtos = strainsData.map((strainData: Strain) => new StrainDto(strainData));
    return strainsDtos;
  }

  async addOne(payload: PostStrainPayload) {
    const strainData = await prisma.strain.create({
      data: { ...payload },
    });

    const strainDto = new StrainDto(strainData);

    return strainDto;
  }

  async getOne(id: number) {
    const strainData = await prisma.strain.findUnique({
      where: { id },
    });

    if(!strainData) {
      throw ApiError.BadRequest('This strain has not been added to the database');
    }

    const strainDto = new StrainDto(strainData);
    return strainDto;
  }

  async updateOne(payload: UpdateStrainPayload, id: number) {
    const strainData = await prisma.strain.update({
      where: { id },
      data: { ...payload },
    });

    if(!strainData) {
      throw ApiError.BadRequest('This strain has not been added to the database')
    }

    const strainDto = new StrainDto(strainData);

    return strainDto;
  }

  async deleteOne(id: number) {
    const strainData = await prisma.strain.delete({
      where: { id },
    });

    if(!strainData) {
      throw ApiError.BadRequest('This strain has not been added to the database')
    }
  }
}

export default new StrainService();
