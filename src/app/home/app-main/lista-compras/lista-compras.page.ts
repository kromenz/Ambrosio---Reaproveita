import { Component } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-compras',
  templateUrl: 'lista-compras.page.html',
  styleUrls: ['lista-compras.page.scss']
})
export class ListaComprasPage {
  produtosSelecionados: any[] = [];

  constructor(private storage: Storage, private router: Router) {
    this.initializeStorage(); // Chame o método initializeStorage() no construtor
  }

  async initializeStorage() {
    await this.storage.create(); // Chame o método create() para criar o banco de dados
    this.carregarSelecionados();
  }

  onClick(x: any) {
    this.router.navigateByUrl(x);
  }

  carregarSelecionados() {
    this.storage.get('produtosSelecionados').then((produtos) => {
      if (produtos) {
        this.produtosSelecionados = produtos;
      }
    });
  }
}
