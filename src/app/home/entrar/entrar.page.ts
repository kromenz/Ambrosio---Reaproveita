import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-entrar',
  templateUrl: './entrar.page.html',
  styleUrls: ['./entrar.page.scss'],
})
export class EntrarPage implements OnInit {

  logForm: FormGroup;
  isSubmitted: boolean;

  constructor(private router: Router){
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
      
      // Redirecionar para a página inicial
      this.router.navigate(['/home/entrar/planeamento']);
      return true
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
