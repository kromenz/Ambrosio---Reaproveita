import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Plan {
  produto: string;
  qtdPlaneada: number;
  qtdConsumida: number;
  qtdComprada: number;
};

@Component({
  selector: 'app-planeamento',
  templateUrl: './planeamento.page.html',
  styleUrls: ['./planeamento.page.scss'],
})
export class PlaneamentoPage implements OnInit {

  public dataPlan: Plan [] = []

  constructor(private router: Router) { }

  ngOnInit() {
    this.loadPlan();
  }

  onClick(x: any){
    this.router.navigateByUrl(x)
  }

  loadPlan(){
    fetch('./assets/data/planeamento.json')
      .then((response) => response.json())
      .then((json) => {
        if(Array.isArray(json)){
          this.dataPlan = json;
          console.log('list data loaded', this.dataPlan);
        } else {
          console.log('list data is empty');
        }
      }).catch((error) => {
        console.log('error loading list data |', error);
      });
  }

  number: number = 0;
  variable1: number = 0;
  variable2: number = 0;

  increment() {
    this.variable1 += this.number;
  }

  decrement() {
    if (this.number > 0) {
      this.variable2 += this.number;
    }
  }

  

}
