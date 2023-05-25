import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Prods {
  nome: string;
  quantidade: string;
  data: string;
  categoria: string;
};

/* car_pes_ovo é carne, pescados e ovos */

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.page.html',
  styleUrls: ['./produtos.page.scss'],
})
export class ProdutosPage implements OnInit {

  public dataProds: Prods [] = []
  
  public searchTerm: string = "";

  constructor(private router: Router) { }

  ngOnInit() {
    this.loadProds()
  }

  onClick(x: any){
    this.router.navigateByUrl(x)
  }

  loadProds(){
    fetch('./assets/data/prods.json')
      .then((response) => response.json())
      .then((json) => {
        if(Array.isArray(json)){
          this.dataProds = json;
          console.log('list data loaded', this.dataProds);
        } else {
          console.log('list data is empty');
        }
      }).catch((error) => {
        console.log('error loading list data |', error);
      });
  }

}
