import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

export interface ListaProds {
  produtos: string,
  categoria: string
}

@Injectable({
  providedIn: 'root'
})
export class ListaService {
  
  private listaProds: { produtos:string, categoria:string }[] = [];
  private storageInstance: Storage | null = null;
  readonly STORAGE_KEY = 'listaProds';

  constructor(private storage: Storage) {
    this.initStorage();
  }

  private async initStorage() {
    this.storageInstance = await this.storage.create();
    const storedList = await this.storageInstance.get(this.STORAGE_KEY);
    this.listaProds = storedList ? JSON.parse(storedList) : [];
  }

  adicionarProduto(produtos: string, categoria: string): Promise<void> {
    return new Promise<void>((resolve) => {
      const prodExistente = this.listaProds.find(prod => prod.produtos === produtos && prod.categoria === categoria);
      if (prodExistente) {
        console.log('O produto já está na lista de compras');
        resolve();
      } else {
        this.listaProds.push({produtos, categoria});
        this.saveToStorage()
          .then(() => {
            console.log('Produto adicionado à lista: ', produtos);
            resolve();
          })
          .catch(error => {
            console.error('Erro ao salvar no armazenamento:', error);
            resolve();
          });
      }
    });
  }

  private async saveToStorage() {
    if (this.storageInstance) {
      await this.storageInstance.set(this.STORAGE_KEY, JSON.stringify(this.listaProds));
    }
  }

  async removerProduto(prod: ListaProds) {
    if (!this.storageInstance) {
      await this.initStorage();
    }
    const index = this.listaProds.findIndex(p=> p.produtos === prod.produtos && p.categoria === prod.categoria);
    if (index > -1) {
      this.listaProds.splice(index, 1);
      await this.saveToStorage();
      console.log('Produto removido do Ionic Storage:', prod);
    }
  }
  
}