import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagIniPage } from './pag-ini.page';

const routes: Routes = [
  {
    path: '',
    component: PagIniPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagIniPageRoutingModule {}
