import { Injectable } from '@angular/core';
import { Provider } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';

export interface Users{
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  private user: Users[];


  constructor(private storage: Storage) {
    this.user = [];
    this.init();
  }

  async init() {
    await this.storage.defineDriver(CordovaSQLiteDriver);
    const storage = await this.storage.create();
    const users = await storage.get('user');
    if (users) {
      this.user = users;
    }
  }
  

  async saveUsers() {
    await this.storage.set('user', this.user);
  }
  

  getUsers(): Users[]{
    return this.user
  }

  addUser(user: Users) {
    this.user.push(user);
    this.saveUsers();
  }

  updateUser(updatedUser: Users) {
    const index = this.user.findIndex(user => user.username === updatedUser.username);
    if (index !== -1) {
      this.user[index] = updatedUser;
      this.saveUsers();
    }
  }

  validarLogin(username: string, password: string): boolean {
    // Lógica de validação dos dados de login
    // Verifique se o usuário e a senha correspondem aos dados armazenados
    // Você pode usar a propriedade 'user' ou outra forma de acesso aos dados de usuário
    const user = this.user.find(u => u.username === username && u.password === password);
    return !!user; // Retorna true se o usuário existir, ou false caso contrário
  }
  

}
