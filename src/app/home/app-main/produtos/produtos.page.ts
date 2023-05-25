import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Prods {
  id: number;
  nome: string;
  quantidade: number;
  data: string;
};

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.page.html',
  styleUrls: ['./produtos.page.scss'],
})
export class ProdutosPage implements OnInit {

  public dataProds: Prods [] = []
  private search: string = ""

  constructor(private router: Router) { }

  ngOnInit() {
    this.loadProds()
  }

  onClick(x: any){
    this.router.navigateByUrl(x)
  }

  loadProds(){
    fetch('./assets/data/lista.json')
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
