import { NgModule, importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IonicStorageModule } from '@ionic/storage-angular';
import { Drivers } from '@ionic/storage';
import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
              importProvidersFrom(
                IonicStorageModule.forRoot({
                    driverOrder: [
                        CordovaSQLiteDriver._driver,
                        Drivers.IndexedDB,
                        Drivers.LocalStorage
                    ],
                }),
              ),            
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
