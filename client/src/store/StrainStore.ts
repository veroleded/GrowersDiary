import { makeAutoObservable } from 'mobx';
import { IStrainResponse } from '../models/response/IStrainResponse';
import StrainService from '../services/StrainService';
import { AxiosError } from 'axios';
import { IStrainRequest } from '../models/IStrainRequest';

type errorName = 'post' | 'getMany' | 'getOne' | 'update' | 'delete';


export default class StrainStore {
  strains =  [] as IStrainResponse[];
  errors = {
    post: false,
    getMany: false,
    getOne: false,
    update: false,
    delete: false,
  };

  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  setLoading(bool: boolean) {
    this.isLoading = bool;
  }

  setStrains(strains: IStrainResponse[]) {
    this.strains = strains;
  }

  setStrain(strain: IStrainResponse) {
    this.strains.push(strain);
  }

  deleteStrain(strainId: number) {
    this.strains.filter((strain) => strain.id !== strainId);
  }

  setError(errorName: errorName) {
    this.errors[errorName] = true;
  }

  deleteError(errorName: errorName) {
    this.errors[errorName] = false;
  }

  async postStrain(strain: IStrainRequest) {
    try {
      this.setLoading(true);
      const response = await StrainService.addOne(strain);
      this.setStrain(response.data);
      this.deleteError('post');
    } catch (e) {
      if (e instanceof AxiosError) {
        this.setError('post');
      }
      console.log(e);
    } finally {
      this.setLoading(false);
    }
  }

  async getStrains() {
    try {
      this.setLoading(true);
      const response = await StrainService.getAll();
      this.setStrains(response.data);
    } catch (e) {
      console.log(e);
    } finally {
      this.setLoading(false);
    }
  }

  async delStrain(id: number) {
    try {
      await StrainService.deleteOne(id);
      this.getStrains();
    } catch(e) {
      console.log(e);
    }
  }
}
