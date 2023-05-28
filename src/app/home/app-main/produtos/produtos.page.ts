import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ScreenOrientation, OrientationLockOptions } from '@capacitor/screen-orientation';
import { ViewWillEnter } from '@ionic/angular';

interface Prods {
  nome: string;
  quantidade: string;
  data: string;
  categoria: string;
};

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.page.html',
  styleUrls: ['./produtos.page.scss'],
})

export class ProdutosPage implements OnInit,ViewWillEnter {
  @ViewChild('popover')
  popover!: { event: Event };
  public dataProds: Prods[] = [];
  
  public searchTerm: string = "";

  constructor(private router: Router) { }

  ngOnInit() {
    this.loadProds();
  }
  isOpen = false;

  presentPopover(e: Event) {
    this.popover.event = e;
    this.isOpen = true;
  }

  onClick(x: any){
    this.router.navigateByUrl(x);
  }

  loadProds(){
    fetch('./assets/data/prods.json')
      .then((response) => response.json())
      .then((json) => {
        if (Array.isArray(json)) {
          this.dataProds = json;
          console.log('list data loaded', this.dataProds);
        } else {
          console.log('list data is empty');
        }
      }).catch((error) => {
        console.log('error loading list data |', error);
      });
  }

  sortByDate() {
    this.dataProds.sort((a, b) => {
      const datePartsA = a.data.split('/');
      const dateA = new Date(parseInt(datePartsA[2]), parseInt(datePartsA[1]) - 1, parseInt(datePartsA[0]));
      
      const datePartsB = b.data.split('/');
      const dateB = new Date(parseInt(datePartsB[2]), parseInt(datePartsB[1]) - 1, parseInt(datePartsB[0]));
      
      if (dateA < dateB) {
        return -1;
      } else if (dateA > dateB) {
        return 1;
      } else {
        return 0;
      }
    });
  
    console.log('Data ordenada:', this.dataProds);
  }
  
  
  sortAlphabetically() {
    this.dataProds.sort((a, b) => a.nome.localeCompare(b.nome));
  }

  sortByQuantity() {
    this.dataProds.sort((a, b) => {
      const quantidadeA = this.extractNumericValue(a.quantidade);
      const quantidadeB = this.extractNumericValue(b.quantidade);
      return quantidadeA - quantidadeB;
    });
  
    console.log('Quantidade ordenada:', this.dataProds);
  }
  
  extractNumericValue(quantidade: string): number {
    const regex = /(\d+(\.\d+)?)\s*(g|kg|ml|L|unidade|unidades)/i; // Atualização da expressão regular
    const match = quantidade.match(regex);
    if (match) {
      const numericValue = parseFloat(match[1]);
      const unit = match[3].toLowerCase();
      switch (unit) {
        case 'g':
          return numericValue / 1000;
        case 'ml':
          return numericValue / 1000;
        case 'kg':
          return numericValue;
        case 'l':
          return numericValue;
        case 'unidade':
          return numericValue;
        case 'unidades':
          return numericValue;
      }
    }
    return 0; // Retornar 0 se não houver um valor numérico válido
  }  

  ionViewWillEnter(): void {
    const options: OrientationLockOptions = { orientation: 'portrait' };
    ScreenOrientation.lock(options);
  }
   
}
