import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

    url = 'http://localhost:3000/users'

    constructor(private http: HttpClient) {

    }

    getAllUsers(){
      return this.http.get(this.url);
    }

    saveUserData(data: any){
      console.log(data);
      return this.http.post(this.url, data);
    }

    checkLogin(username: string, password: string){
      return this.http.get<any>(this.url).toPromise().then(data => {
        console.log('Dados do arquivo:', data);
        if (data && data.users && Array.isArray(data.users)) {
          const matchingUser = data.users.find((user: any) =>
            user.username === username && user.password === password
          );
          console.log('Usuário correspondente:', matchingUser);
          return matchingUser || null;
        } else {
          return null;
        }
      });
    }

}
