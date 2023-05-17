import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppMainPage } from './app-main.page';

const routes: Routes = [
  {
    path: '',
    component: AppMainPage
  },
  {
    path: 'lista',
    loadChildren: () => import('./lista/lista.module').then( m => m.ListaPageModule)
  },
  {
    path: 'produtos',
    loadChildren: () => import('./produtos/produtos.module').then( m => m.ProdutosPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppMainPageRoutingModule {}
