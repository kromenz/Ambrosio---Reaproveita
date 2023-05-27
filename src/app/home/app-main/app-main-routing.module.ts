import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppMainPage } from './app-main.page';

const routes: Routes = [
  {
    path: '',
    component: AppMainPage,
    children: [
      {
        path: 'lista',
        loadChildren: () => import('./lista/lista.module').then( m => m.ListaPageModule)
      },
      {
        path: 'produtos',
        loadChildren: () => import('./produtos/produtos.module').then( m => m.ProdutosPageModule)
      },
      {
        path: 'planeamento',
        loadChildren: () => import('./planeamento/planeamento.module').then( m => m.PlaneamentoPageModule)
      },
      {
        path: 'app-main',
        redirectTo: '/planeamento',
        pathMatch: 'full',
      }
    ],
  },  {
    path: 'lista-compras',
    loadChildren: () => import('./lista-compras/lista-compras.module').then( m => m.ListaComprasPageModule)
  }

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppMainPageRoutingModule {}
