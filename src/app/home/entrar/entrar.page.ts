import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UserDataService } from 'src/app/services/user-data.service';
import { CriarContaPage } from '../criar-conta/criar-conta.page';

@Component({
  selector: 'app-entrar',
  templateUrl: './entrar.page.html',
  styleUrls: ['./entrar.page.scss'],
})
export class EntrarPage implements OnInit {

  entrarForm: FormGroup;
  criarForm: FormGroup;
  isSubmitted: boolean;

  constructor(private userSV: UserDataService, private router: Router, private formBuilder: FormBuilder) {
    this.entrarForm = this.formBuilder.group({
      user: new FormControl('', [Validators.required]),
      pass: new FormControl('', [Validators.required]),
    });
    this.isSubmitted = false;

    this.criarForm = this.formBuilder.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  submitForm() {
    const criarUsername = this.criarForm.get('username')?.value;
    const criarPassword = this.criarForm.get('password')?.value;
    const entrarUsername = this.entrarForm.get('user')?.value;
    const entrarPassword = this.entrarForm.get('pass')?.value;

    if (this.entrarForm.valid && criarUsername === entrarUsername && criarPassword === entrarPassword) {
      // As credenciais são válidas, continuar para a página "home"
      this.router.navigate(['/home']);
    } else {
      // Exibir mensagem de erro ou realizar qualquer ação adicional para tratar as credenciais inválidas
    }
  }

  

  ngOnInit() {
  }

  get formControls() { 
    return this.entrarForm.controls;
  }
}
