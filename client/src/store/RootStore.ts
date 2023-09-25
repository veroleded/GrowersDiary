import AuthStore from './AuthStore';

export default class RootStore {
  AuthStore: AuthStore;

  constructor() {
    this.AuthStore = new AuthStore();
  }
}
