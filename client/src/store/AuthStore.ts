import { makeAutoObservable } from 'mobx';
import { IUser } from '../models/IUser';
import AuthService from '../services/AuthService';
import axios, { AxiosError } from 'axios';
import { AuthResponse } from '../models/response/AuthResponse';
import { API_URL } from '../http';

export default class AuthStore {
  user = {} as IUser;
  isAuth = false;
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  setAuth(bool: boolean) {
    this.isAuth = bool;
  }

  setUser(user: IUser) {
    this.user = user;
  }

  async login(email: string, password: string) {
    try {
      const response = await AuthService.login(email, password);
      const token = response.data.accessToken;
      const user = response.data.user;

      localStorage.setItem('token', token);
      this.setAuth(true);
      this.setUser(user);
    } catch (e) {
      if (e instanceof AxiosError) {
        console.log(e.response?.data);
      } else {
        console.log(e);
      }
    }
  }

  async registration(email: string, name: string, password: string) {
    try {
      const response = await AuthService.registration(email, name, password);
      const token = response.data.accessToken;
      const user = response.data.user;

      localStorage.setItem('token', token);
      this.setAuth(true);
      this.setUser(user);
    } catch (e) {
      if (e instanceof AxiosError) {
        console.log(e.response?.data);
      } else {
        console.log(e);
      }
    }
  }

  async logout() {
    try {
      await AuthService.logout();
      localStorage.removeItem('token');
      this.setAuth(false);
      this.setUser({} as IUser);
    } catch (e) {
      if (e instanceof AxiosError) {
        console.log(e.response?.data);
      } else {
        console.log(e);
      }
    }
  }

  setLoading(bool: boolean) {
    this.isLoading = bool;
  }

  async checkAuth() {
    this.setLoading(true);
    try {
      const response = await axios.get<AuthResponse>(`${API_URL}/auth/refresh`, {
        withCredentials: true,
      });

      const token = response.data.accessToken;
      const user = response.data.user;

      localStorage.setItem('token', token);
      this.setAuth(true);
      this.setUser(user);
    } catch (e) {
      if (e instanceof AxiosError) {
        console.log(e);
      } else {
        console.log(e);
      }
    } finally {
      this.setLoading(false);
    }
  }
}
