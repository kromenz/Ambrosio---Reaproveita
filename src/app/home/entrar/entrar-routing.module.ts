import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EntrarPage } from './entrar.page';

const routes: Routes = [
  {
    path: '',
    component: EntrarPage
  },
  {
    path: 'forget-password',
    loadChildren: () => import('./forget-password/forget-password.module').then( m => m.ForgetPasswordPageModule)
  },
  {
    path: 'pag-ini',
    loadChildren: () => import('./pag-ini/pag-ini.module').then( m => m.PagIniPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EntrarPageRoutingModule {}
