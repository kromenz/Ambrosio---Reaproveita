import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonAccordionGroup } from '@ionic/angular';
import { ListaService, ListaProds } from 'src/app/services/lista/lista.service';

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

  public dataList: List[] = [];

  @ViewChild('accordionGroup', { static: true }) accordionGroup: IonAccordionGroup | undefined;

  constructor(private router: Router, private listaSV: ListaService) { }

  ngOnInit() {
    this.loadList();
  }

  onClick(x: any) {
    this.router.navigateByUrl(x);
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

  removerProduto(produto: string) {
    const listaProduto: ListaProds = { produtos: produto, categoria: '' };
    this.listaSV.removerProduto(listaProduto)
      .then(() => console.log('Produto removido da lista:', produto))
      .catch(error => console.error('Erro ao remover produto da lista:', error));
  }

  adicionarProduto(produtos: string, categoria: string) {
    this.listaSV.adicionarProduto(produtos, categoria)
      .then(() => {
        console.log('Produto adicionado à lista:', produtos);
      })
      .catch((error) => {
        console.error('Erro ao adicionar produto à lista:', error);
      });
  }
}
