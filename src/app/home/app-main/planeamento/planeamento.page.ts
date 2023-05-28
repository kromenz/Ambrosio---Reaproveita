import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ScreenOrientation, OrientationLockOptions } from '@capacitor/screen-orientation';
import { ViewWillEnter } from '@ionic/angular';

interface Plan {
  produto: string;
  qtdPlaneada: number;
  qtdConsumida: number;
  qtdComprada: number;
  qtdInput: number;
  UnMedida: number;
};

@Component({
  selector: 'app-planeamento',
  templateUrl: './planeamento.page.html',
  styleUrls: ['./planeamento.page.scss'],
})
export class PlaneamentoPage implements OnInit,ViewWillEnter {

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
    fetch('./assets/data/planeamento copy.json')
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
    const url = 'http://localhost:3000/planeamento';
    
    this.http.get<any>(url)
      .subscribe((data) => {
        const itemEncontrado = data.find((item: any) => item.produto === produto);

        if (itemEncontrado) {
          const itemId = itemEncontrado.id;
          const updatedItem = {
            ...itemEncontrado,
            qtdComprada: itemEncontrado.qtdComprada + qtdInput,
          };

          this.http.patch<any>(`${url}/${itemId}`, updatedItem)
            .subscribe((response) => {
              console.log('Dados atualizados com sucesso:', response);
            }, (error) => {
              console.log('Erro ao atualizar os dados:', error);
            });
        } else {
          console.log('Produto não encontrado');
        }
      }, (error) => {
        console.log('Erro ao obter os dados:', error);
      });
  }

  decrement(produto: string, qtdConsumida: number, qtdInput: number) {
    if (qtdInput > 0) {
      const url = 'http://localhost:3000/planeamento';
  
  this.http.get<any>(url)
    .subscribe((data) => {
      const itemEncontrado = data.find((item: any) => item.produto === produto);

      if (itemEncontrado) {
        const itemId = itemEncontrado.id;
        const updatedItem = {
          ...itemEncontrado,
          qtdConsumida: itemEncontrado.qtdConsumida + qtdInput,
        };

        this.http.patch<any>(`${url}/${itemId}`, updatedItem)
          .subscribe((response) => {
            console.log('Dados atualizados com sucesso:', response);
          }, (error) => {
            console.log('Erro ao atualizar os dados:', error);
          });
      } else {
        console.log('Produto não encontrado');
      }
    }, (error) => {
      console.log('Erro ao obter os dados:', error);
    });
    }
  }
  nivelAmbrosio: number=100;

  calcularNivelAmbrósio() {
    const url = 'http://localhost:3000/planeamento';
  
    this.http.get<any[]>(url).subscribe((data) => {
      let totalItens = 0;
      let somaDiferencas = 0;
  
      data.forEach((item) => {
        const diferencaComprada = Math.abs(item.qtdComprada - item.qtdPlaneada);
        const diferencaConsumida = Math.abs(item.qtdConsumida - item.qtdPlaneada);
        const diferencaTotal = Math.max(diferencaComprada, diferencaConsumida);
  
        somaDiferencas += diferencaTotal;
        totalItens++;
      });
  
      if (totalItens === 0) {
        console.log('Nenhum item encontrado.');
        return;
      }
  
      const mediaDiferencas = somaDiferencas / totalItens;
      const nivelAmbrósio = 100 - mediaDiferencas;
      this.nivelAmbrosio=nivelAmbrósio;
      console.log(this.nivelAmbrosio)
  
      console.log('Nível de Ambrósio:', nivelAmbrósio.toFixed(2), '%');
    }, (error) => {
      console.log('Erro ao obter os dados:', error);
    });
  }
  
  ionViewWillEnter(): void {
    const options: OrientationLockOptions = { orientation: 'portrait' };
    ScreenOrientation.lock(options);
  }
  

}
