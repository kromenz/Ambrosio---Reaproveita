import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface Plan {
  produto: string;
  qtdPlaneada: number;
  qtdConsumida: number;
  qtdComprada: number;
  qtdInput: number;
};

@Component({
  selector: 'app-planeamento',
  templateUrl: './planeamento.page.html',
  styleUrls: ['./planeamento.page.scss'],
})
export class PlaneamentoPage implements OnInit {

  public dataPlan: Plan [] = []

  constructor(private http: HttpClient, private router: Router) { 
  
  }

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
  

  increment(produto: string, qtdComprada: number, qtdInput: number) {
    const updatedData = {
      produto: produto,
      qtdComprada: qtdComprada + qtdInput
    };
  
    this.http.post('./assets/data/planeamento.json', updatedData)
      .subscribe((response) => {
        console.log('Dados atualizados com sucesso:', response);
      }, (error) => {
        console.log('Erro ao atualizar os dados:', error);
      });
  }

  decrement(produto: string, qtdConsumida: number, qtdInput: number) {
    if (qtdInput > 0) {
      qtdConsumida += qtdInput
      console.log(produto)
    }
  }

  

}
