import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ScreenOrientation, OrientationLockOptions } from '@capacitor/screen-orientation';
import { ViewWillEnter } from '@ionic/angular';


@Component({
  selector: 'app-criar-conta',
  templateUrl: './criar-conta.page.html',
  styleUrls: ['./criar-conta.page.scss'],
})

export class CriarContaPage implements OnInit,ViewWillEnter {

  CriarForm: FormGroup;
  isSubmitted: boolean;
  userData: any = [];
  mensagem: boolean = false;


  constructor(
    private router: Router, 
    private auth: AngularFireAuth
    ){
    this.CriarForm = new FormGroup({
      nome: new FormControl('', [Validators.required, Validators.minLength(2)]),
      apelido:  new FormControl('', [Validators.required, Validators.minLength(2)]),
      email: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      password:  new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
    this.isSubmitted = false;

  }

  ngOnInit(){

  }

  async submitForm() {
    this.isSubmitted = true;
    if (!this.CriarForm.valid) {
      return false;
    } else {
      
      const email = this.CriarForm.value.email
      const password = this.CriarForm.value.password

      if(await this.auth.createUserWithEmailAndPassword(email, password)){
        this.mensagem = true
      }
    
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

  removeMensagem(){
    this.mensagem = false;
    this.router.navigate(['/home']);
  }

  ionViewWillEnter(): void {
    const options: OrientationLockOptions = { orientation: 'portrait' };
    ScreenOrientation.lock(options);
  }

}

