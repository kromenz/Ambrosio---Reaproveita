import { Component } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';
import { ScreenOrientation, OrientationLockOptions } from '@capacitor/screen-orientation';
import { ViewWillEnter } from '@ionic/angular';

interface Produto {
  nome: string;
  visivel: boolean;
}

@Component({
  selector: 'app-lista-compras',
  templateUrl: 'lista-compras.page.html',
  styleUrls: ['lista-compras.page.scss']
})
export class ListaComprasPage implements ViewWillEnter{
  voltandoAtras: boolean = false;

  produtosSelecionados: Produto[] = [];
  produtosListaOriginal: Produto[] = []; // Nova propriedade para armazenar a lista original de produtos selecionados

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
  
    // Verificar se há produtos em produtosListaCompras que não estão em produtosSelecionados
    this.produtosListaCompras.forEach(produto => {
      const existe = this.produtosSelecionados.some(p => p.nome === produto.nome);
      if (!existe) {
        produto.visivel = false;
      }
    });

    const options: OrientationLockOptions = { orientation: 'portrait' };
    ScreenOrientation.lock(options);
  }
  
  onClick(x: any) {
    this.router.navigateByUrl(x);
  }

  carregarSelecionados() {
    this.storage.get('produtosSelecionados').then((produtos: Produto[]) => {
      if (produtos) {
        this.produtosSelecionados = produtos;
  
        // Verificar se algum produto da produtosListaOriginal não está presente em produtosSelecionados e removê-los
        this.produtosListaOriginal = this.produtosListaOriginal.filter(p =>
          this.produtosSelecionados.some(s => s.nome === p.nome)
        );
  
        this.atualizarProdutosListaCompras();
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
    this.atualizarProdutosListaCompras();
  }

  removerProduto(produto: Produto) {
    this.produtosSelecionados = this.produtosSelecionados.filter(p => p !== produto);
    this.produtosListaCompras = this.produtosListaCompras.filter(p => p !== produto); // Atualize a lista produtosListaCompras
    this.salvarSelecionados();
  }
  
  private atualizarProdutosListaCompras() {
    this.produtosListaCompras = this.produtosSelecionados.filter(produto => produto.visivel);
  }

  restaurarEstadoOriginal() {
    this.produtosSelecionados = [...this.produtosListaOriginal]; // Restaure a lista de produtos selecionados com a lista original
    this.produtosListaCompras = this.produtosSelecionados.filter(produto => produto.visivel); // Atualize a lista produtosListaCompras
    this.salvarSelecionados();
  }

}
