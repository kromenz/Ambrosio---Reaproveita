import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';


@Component({
  selector: 'app-criar-conta',
  templateUrl: './criar-conta.page.html',
  styleUrls: ['./criar-conta.page.scss'],
})

export class CriarContaPage implements OnInit {

  CriarForm: FormGroup;
  isSubmitted: boolean;
  userData: any = [];
  mensagem: boolean = false;


  constructor(
    private router: Router, 
    private data: AuthenticationService,
    ){
    this.CriarForm = new FormGroup({
      nome: new FormControl('', [Validators.required, Validators.minLength(2)]),
      apelido:  new FormControl('', [Validators.required, Validators.minLength(2)]),
      email: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      username:  new FormControl('', [Validators.required, Validators.minLength(2)]),
      password:  new FormControl('', [Validators.required, Validators.minLength(2)]),
    });
    this.isSubmitted = false;

  }

  ngOnInit(): void {
    this.data.getAllUsers().subscribe((allData) =>{
      this.userData = allData;
    })
  }

  submitForm() {
    this.isSubmitted = true;
    if (!this.CriarForm.valid) {
      return false;
    } else {
      
      const username = this.CriarForm.value.username
      const password = this.CriarForm.value.password

      this.saveData();

      // Redirecionar para a página inicial
      
      return true
    }
  }

  // bind (ligação) de uma propriedade de um objeto a uma função
  // quando a propriedade é "invocada" a função getter é utilizada
  get formControls() { 
    return this.CriarForm.controls;
  }

  onClick(x: any){
    this.router.navigateByUrl(x)
  }

  saveData(){
    this.data.saveUserData(this.CriarForm.value).subscribe((result) =>{
      this.mensagem = true;
    });
  }


  removeMensagem(){
    this.mensagem = false;
    this.router.navigate(['/home']);
  }

}

