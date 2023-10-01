import { makeAutoObservable } from 'mobx';
import { IStrain } from '../models/IStrain';
import StrainService from '../services/StrainService';
import { AxiosError } from 'axios';

type errorName = 'post' | 'getMany' | 'getOne' | 'update' | 'delete';

interface Strains  {
  [id: number]: IStrain;
}

export default class StrainStore {
  strains = {} as Strains;
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

  setStrains(strains: IStrain[]) {
    strains.forEach((strain) => this.strains[strain.id as number] = strain)
  }

  setStrain(strain: IStrain) {
    this.strains[strain.id as number] = strain;
  }

  setError(errorName: errorName) {
    this.errors[errorName] = true;
  }

  deleteError(errorName: errorName) {
    this.errors[errorName] = false;
  }

  async postStrain(strain: IStrain) {
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
}
