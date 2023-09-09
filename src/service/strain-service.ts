import { PrismaClient, Strain } from '@prisma/client';
import StrainData from '../types/strainPayload';
import StrainDto from '../dtos/strain-dto';

const prisma = new PrismaClient();

class StrainService {
  async getAll() {
    const strainsData  = await prisma.strain.findMany();
    const strainsDtos = strainsData.map((strainData: Strain) => new StrainDto(strainData))
    return strainsDtos;
  }

  async add(strainData: StrainData) {
    const StrainData = await prisma.strain.create({
      data: { ...strainData },
    });

    const strainDto = new StrainDto(StrainData);

    return strainDto;
  }
}

export default new StrainService();