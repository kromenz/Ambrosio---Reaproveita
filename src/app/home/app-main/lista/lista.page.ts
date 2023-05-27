import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonAccordionGroup } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

interface List {
  produtos: string[];
  categoria: string;
  imagem: string;
}


@Component({
  selector: 'app-lista',
  templateUrl: './lista.page.html',
  styleUrls: ['./lista.page.scss'],
})
export class ListaPage implements OnInit {
  listaProdutos: any[] = [];
  selectedProdutos: any[] = [];
  selectedProducts: string[] = [];

  public dataList: List[] = [];

  @ViewChild('accordionGroup', { static: true }) accordionGroup: IonAccordionGroup | undefined;

  constructor(private router: Router, private storage: Storage) {}

  async ngOnInit() {
    await this.initializeStorage();
    this.loadList();
  }

  onClick(x: any) {
    this.router.navigateByUrl(x);
  }

  async initializeStorage() {
    await this.storage.create();
    this.carregarSelecionados();
  }

  loadList() {
    fetch('./assets/data/lista_produtos.json')
      .then((response) => response.json())
      .then((json) => {
        if (Array.isArray(json)) {
          this.dataList = json;
          console.log('list data loaded', this.dataList);
        } else {
          console.log('list data is empty');
        }
      })
      .catch((error) => {
        console.log('error loading list data:', error);
      });
  }

  salvarSelecionados() {
    this.storage.set('produtosSelecionados', this.selectedProducts);
  }
  
  carregarSelecionados() {
    this.storage.get('produtosSelecionados').then((produtos) => {
      if (produtos) {
        this.selectedProducts = produtos;
      }
    });
  }

  selecionarProduto(produto: string) {
    if (this.selectedProducts.includes(produto)) {
      this.selectedProducts = this.selectedProducts.filter((p) => p !== produto);
      console.log("Produto removido: " + produto);
    } else {
      this.selectedProducts.push(produto);
      console.log("Produto adicionado: " + produto);
    }
  }

}
