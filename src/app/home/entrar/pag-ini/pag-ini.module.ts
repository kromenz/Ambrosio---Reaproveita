import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PagIniPageRoutingModule } from './pag-ini-routing.module';

import { PagIniPage } from './pag-ini.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PagIniPageRoutingModule
  ],
  declarations: [PagIniPage]
})
export class PagIniPageModule {}
