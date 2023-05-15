import { Injectable } from '@angular/core';

import { Provider } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class UserDataService {
 
  private username!: string;
  private password!: string;

  constructor() { }

  setDadosUsuario(username: string, password: string) {
    this.username = username;
    this.password = password;
  }

  getUsername(): string {
    return this.username;
  }

  getPassword(): string {
    return this.password;
  }
}
