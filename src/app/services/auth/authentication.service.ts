import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

    isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
      true
    );
    private users: any[] = [];

    constructor(private storage: Storage) {
      this.init();
    }

    async init() {
      await this.storage.create();
      const storedUsers = await this.storage.get('users');
      if (storedUsers) {
        this.users = storedUsers;
      }
    }

    loginUser(username: string, password: string): boolean {
      const user = this.users.find(u => u.username === username && u.password === password);
      if (user) {
        this.isAuthenticated.next(true); // Define o status de autenticação como verdadeiro
        return true;
      } else {
        this.isAuthenticated.next(false); // Define o status de autenticação como falso
        return false;
      }
    }
  
    logoutUser() {
      this.isAuthenticated.next(false); // Define o status de autenticação como falso ao fazer logout
    }
}
