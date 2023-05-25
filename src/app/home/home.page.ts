import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  logForm: FormGroup;
  isSubmitted: boolean;
  logData: any = [];
  errorMensagem: string = '';

  constructor(
    private router: Router, 
    private auth: AngularFireAuth
    ){
    this.logForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      password:  new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
    this.isSubmitted = false;
  }

  ngOnInit() {
  }

  async submitForm() {
    this.isSubmitted = true;
    if (!this.logForm.valid) {
      return false;
    } else {

      const email = this.logForm.value.email;
      const password = this.logForm.value.password;
      console.log(email + " " + password)

      try {
        if (await this.auth.signInWithEmailAndPassword(email, password)) {
          this.router.navigate(['home/app-main/planeamento']);
        } else {
          this.errorMensagem = 'Credenciais inválidas. Verifique o seu email ou a sua password.';
          return false;
        }
      } catch (error) {
        this.errorMensagem = 'Utilizador não encontrado. Verifique o seu email ou password.';
        return false;
      }
      

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
