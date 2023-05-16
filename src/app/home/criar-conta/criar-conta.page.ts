import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserDataService, Users } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-criar-conta',
  templateUrl: './criar-conta.page.html',
  styleUrls: ['./criar-conta.page.scss'],
})

export class CriarContaPage implements OnInit {

  CriarForm: FormGroup;
  isSubmitted: boolean;

  constructor(private router: Router, private userData: UserDataService){
    this.CriarForm = new FormGroup({
      nome_p: new FormControl('', [Validators.required, Validators.minLength(2)]),
      apelido:  new FormControl('', [Validators.required, Validators.minLength(2)]),
      username:  new FormControl('', [Validators.required, Validators.minLength(2)]),
      password:  new FormControl('', [Validators.required, Validators.minLength(2)]),
      email: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
    });
    this.isSubmitted = false;
  }

  ngOnInit() {
  }

  submitForm() {
    this.isSubmitted = true;
    if (!this.CriarForm.valid) {
      return false;
    } else {
      const valoresFormulario = this.CriarForm.value;

      const user: Users = {
        username: valoresFormulario.username,
        password: valoresFormulario.password
      };

      this.userData.addUser(user);
      // Redirecionar para a página inicial
      this.router.navigate(['/home']);
      return true
    }
  }
  
  
  // bind (ligação) de uma propriedade de um objeto a uma função
  // quando a propriedade é "invocada" a função getter é utilizada
  get formControls() { 
    return this.CriarForm.controls;
  }
}
