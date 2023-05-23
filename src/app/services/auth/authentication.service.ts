import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {AngularFireAuth} from '@angular/fire/compat/auth'
import {AngularFirestore} from '@angular/fire/compat/firestore'

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

   /*  url = 'http://localhost:3000/users' */

    constructor(private http: HttpClient, 
      public firestore: AngularFirestore,
      public auth: AngularFireAuth
      ) 
    {
      
    }

    /* getAllUsers(){
      return this.http.get(this.url);
    }

    saveUserData(data: any){
      console.log(data);
      return this.http.post(this.url, data);
    }

    checkLogin(username: string, password: string){
      return this.http.get<any>(this.url).toPromise().then(data => {
        console.log('Dados do arquivo:', data);
        if (data && Array.isArray(data) && data.find((user: any) => 
        user.username === username && user.password === password)) {
          // Usuário correspondente encontrado
          return true;
        } else {
          // Usuário não encontrado
          return false;
        }        
      });
    } */


}