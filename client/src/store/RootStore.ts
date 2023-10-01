import { makeAutoObservable } from 'mobx';
import AuthStore from './AuthStore';
import StrainStore from './StrainStore';

export default class RootStore {
  AuthStore = {} as AuthStore;
  StrainStore = {} as StrainStore;

  constructor() {
    this.AuthStore = new AuthStore();
    this.StrainStore = new StrainStore();
    makeAutoObservable(this);
  }
}
