import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlaneamentoPageRoutingModule } from './planeamento-routing.module';

import { PlaneamentoPage } from './planeamento.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlaneamentoPageRoutingModule
  ],
  declarations: [PlaneamentoPage]
})
export class PlaneamentoPageModule {}
