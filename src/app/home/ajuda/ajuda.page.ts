import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ajuda',
  templateUrl: './ajuda.page.html',
  styleUrls: ['./ajuda.page.scss'],
})
export class AjudaPage implements OnInit {

  helpForm: FormGroup;
  isSubmitted: boolean;

  constructor(private router: Router){
    this.helpForm = new FormGroup({
      username:  new FormControl('', [Validators.required, Validators.minLength(2)]),
      tipo_prob:  new FormControl('', [Validators.required, Validators.minLength(30)]),
      descricao:  new FormControl('', [Validators.required, Validators.minLength(150)]),
    });
    this.isSubmitted = false;
  }

  ngOnInit() {
  }

  submitForm() {
    this.isSubmitted = true;
    if (!this.helpForm.valid) {
      return false;
    } else {
      
      // Redirecionar para a página inicial
      this.router.navigate(['/home/entrar/planeamento']);
      return true
    }
  }
  
  // bind (ligação) de uma propriedade de um objeto a uma função
  // quando a propriedade é "invocada" a função getter é utilizada
  get formControls() { 
    return this.helpForm.controls;
  }

  onClick(x: any){
    this.router.navigateByUrl(x)
  }

}
