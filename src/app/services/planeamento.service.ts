import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';


export interface Planeamento{
  id: number;
  itens: [];
  mes: string;
}

@Injectable({
  providedIn: 'root'
})
export class PlaneamentoService {
    private plan: Planeamento[] = [];

  constructor(private storage: Storage) {
      this.plan = [];
      this.init();
  }

  async init() {
      await this.storage.defineDriver(CordovaSQLiteDriver);
      const storage = await this.storage.create();
      const plan = await storage.get('plan');
      if (plan) {
          this.plan = plan;
      }
  }

  getPlaneamento(): Planeamento[] | never[] {
    return this.plan || [];
  }

  async addPlaneamento(plan: Planeamento) {
      if (!plan.id) {
          plan.id = Date.now();
      }
      this.plan.push(plan);
      await this.storage.set('plan', this.plan);
  }

  async deletePlaneamento(id: number) {
    const index = this.plan.findIndex(t => t.id === id);
    if (index >= 0) {
        this.plan.splice(index, 1);
        await this.storage.set('plan', this.plan);
    }
}

  async updatePlaneamento(plan: Planeamento) {
      const index = this.plan.findIndex(t => t.id === plan.id);
      if (index >= 0) {
          this.plan[index] = plan;
          await this.storage.set('plan', this.plan);
      }
  }
} 
