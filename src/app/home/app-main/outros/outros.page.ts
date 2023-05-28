import { Component, OnInit } from '@angular/core';
import { ScreenOrientation, OrientationLockOptions } from '@capacitor/screen-orientation';
import { ViewWillEnter } from '@ionic/angular';

@Component({
  selector: 'app-outros',
  templateUrl: './outros.page.html',
  styleUrls: ['./outros.page.scss'],
})
export class OutrosPage implements OnInit,ViewWillEnter {

  constructor() { }

  ngOnInit() {
  }

  ionViewWillEnter(): void {
    const options: OrientationLockOptions = { orientation: 'portrait' };
    ScreenOrientation.lock(options);
  }

}
