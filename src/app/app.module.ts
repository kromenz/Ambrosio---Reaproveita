import { NgModule, importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IonicStorageModule } from '@ionic/storage-angular';
import { Drivers } from '@ionic/storage';
import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';
import {HttpClientModule} from '@angular/common/http'
import {AngularFireModule} from '@angular/fire/compat'
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, 
    AngularFireModule.initializeApp(environment.firebase), IonicStorageModule.forRoot()],
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
