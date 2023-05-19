import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OutrosPageRoutingModule } from './outros-routing.module';

import { OutrosPage } from './outros.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OutrosPageRoutingModule
  ],
  declarations: [OutrosPage]
})
export class OutrosPageModule {}
