import { AxiosResponse } from 'axios';
import $api from '../http';
import { IStrainResponse } from '../models/response/IStrainResponse';
import { IStrainRequest } from '../models/IStrainRequest';

export default class StrainService {
  static async getAll(): Promise<AxiosResponse<IStrainResponse[]>> {
    return $api.get<IStrainResponse[]>('/strains');
  }

  static async addOne(strain: IStrainRequest): Promise<AxiosResponse<IStrainResponse>> {
    return $api.post<IStrainResponse>('/strains', strain);
  }

  static async deleteOne(strainId: number): Promise<AxiosResponse<void>> {
    return $api.delete<void>(`/strains/${strainId}`);
  }
}