import { Component } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';
import {
  ScreenOrientation,
  OrientationLockOptions,
} from '@capacitor/screen-orientation';
import { ViewWillEnter } from '@ionic/angular';

@Component({
  selector: 'app-lista-compras',
  templateUrl: 'lista-compras.page.html',
  styleUrls: ['lista-compras.page.scss'],
})
export class ListaComprasPage implements ViewWillEnter {
  voltandoAtras: boolean = false;

  produtosSelecionados: string[] = [];
  produtosListaOriginal: string[] = []; // Nova propriedade para armazenar a lista original de produtos selecionados

  novoProduto: string = '';

  constructor(private storage: Storage, private router: Router) {
    this.initializeStorage(); // Chame o método initializeStorage() no construtor
  }

  async initializeStorage() {
    await this.storage.create(); // Chame o método create() para criar o banco de dados
    this.carregarSelecionados();
  }

  ionViewWillEnter() {
    this.carregarSelecionados();

    const options: OrientationLockOptions = { orientation: 'portrait' };
    ScreenOrientation.lock(options);
  }

  onClick(x: any) {
    this.router.navigateByUrl(x);
  }

  carregarSelecionados() {
    this.storage.get('produtosSelecionados').then((produtos: string[]) => {
      if (produtos) {
        this.produtosSelecionados = produtos;

        // Verificar se algum produto da produtosListaOriginal não está presente em produtosSelecionados e removê-los
        this.produtosListaOriginal = this.produtosListaOriginal.filter((p) =>
          this.produtosSelecionados.some((s) => s === p)
        );
      }
    });
  }

  adicionarProduto() {
    if (this.novoProduto) {
      this.produtosSelecionados.push(this.novoProduto);
      this.novoProduto = '';
      this.salvarSelecionados();
    }
  }

  salvarSelecionados() {
    this.storage.set('produtosSelecionados', this.produtosSelecionados);
  }

  removerProduto(produto: string) {
    this.produtosSelecionados = this.produtosSelecionados.filter(
      (p) => p !== produto
    );
    this.salvarSelecionados();
  }

  restaurarEstadoOriginal() {
    this.produtosSelecionados = [...this.produtosListaOriginal]; // Restaure a lista de produtos selecionados com a lista original
    this.salvarSelecionados();
  }
}
