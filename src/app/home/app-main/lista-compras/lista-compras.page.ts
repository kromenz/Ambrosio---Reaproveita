import { Component } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';

interface Produto {
  nome: string;
  visivel: boolean;
}

@Component({
  selector: 'app-lista-compras',
  templateUrl: 'lista-compras.page.html',
  styleUrls: ['lista-compras.page.scss']
})
export class ListaComprasPage {

  produtosSelecionados: Produto[] = [];

  novoProduto: string = '';

  produtosListaCompras: Produto[] = [];


  constructor(private storage: Storage, private router: Router) {
    this.initializeStorage(); // Chame o método initializeStorage() no construtor
  }

  async initializeStorage() {
    await this.storage.create(); // Chame o método create() para criar o banco de dados
    this.carregarSelecionados();
  }

  ionViewWillEnter() {
    this.carregarSelecionados();
  }
  

  onClick(x: any) {
    this.router.navigateByUrl(x);
  }

  carregarSelecionados() {
    this.storage.get('produtosSelecionados').then((produtos: Produto[]) => {
      if (produtos) {
        this.produtosSelecionados = produtos;
        this.produtosListaCompras = this.produtosSelecionados.filter(produto => produto.visivel);
      }
    });
  }
  
  adicionarProduto() {
    if (this.novoProduto) {
      const novoProduto: Produto = { nome: this.novoProduto, visivel: true };
      this.produtosSelecionados.push(novoProduto);
      this.novoProduto = '';
      this.salvarSelecionados();
    }
  }

  salvarSelecionados() {
    this.storage.set('produtosSelecionados', this.produtosSelecionados);
    this.produtosListaCompras = this.produtosSelecionados.filter(produto => produto.visivel);
  }

  removerProduto(produto: Produto) {
    this.produtosSelecionados = this.produtosSelecionados.filter(p => p !== produto);
    this.salvarSelecionados();
  }
  
}