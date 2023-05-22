import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/auth/authentication.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  logForm: FormGroup;
  isSubmitted: boolean;

  logData: any = [];


  constructor(private router: Router, private data: AuthenticationService){
    this.logForm = new FormGroup({
      username:  new FormControl('', [Validators.required, Validators.minLength(2)]),
      password:  new FormControl('', [Validators.required, Validators.minLength(2)]),
    });
    this.isSubmitted = false;
  }

  ngOnInit() {
  }

  submitForm() {
    this.isSubmitted = true;
    if (!this.logForm.valid) {
      return false;
    } else {

      const username = this.logForm.value.username;
      const password = this.logForm.value.password;
      console.log(username + " " + password)
      this.data.checkLogin(username, password).then(user => {
        console.log(user);
        if (user) {
          // As informações de login são válidas, redirecione o usuário para a página inicial
          this.router.navigate(['/home']);
        } else {
          console.log(user)
          // As informações de login são inválidas, exiba uma mensagem de erro
          console.log('Informações de login inválidas');
        }
      });

      return true;
    }
  }
  
  // bind (ligação) de uma propriedade de um objeto a uma função
  // quando a propriedade é "invocada" a função getter é utilizada
  get formControls() { 
    return this.logForm.controls;
  }

  onClick(x: any){
    this.router.navigateByUrl(x)
  }
}
