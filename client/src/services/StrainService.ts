import { AxiosResponse } from 'axios';
import $api from '../http';
import { IStrain } from '../models/IStrain';

export default class StrainService {
  static async getAll(): Promise<AxiosResponse<IStrain[]>> {
    return $api.get<IStrain[]>('/strains');
  }

  static async addOne(strain: IStrain): Promise<AxiosResponse<IStrain>> {
    return $api.post<IStrain>('/strains', strain);
  }
}