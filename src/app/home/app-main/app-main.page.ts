import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ScreenOrientation, OrientationLockOptions } from '@capacitor/screen-orientation';
import { ViewWillEnter } from '@ionic/angular';

@Component({
  selector: 'app-app-main',
  templateUrl: './app-main.page.html',
  styleUrls: ['./app-main.page.scss'],
})
export class AppMainPage implements OnInit,ViewWillEnter {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onClick(x: any){
    this.router.navigateByUrl(x)
  }

  ionViewWillEnter(): void {
    const options: OrientationLockOptions = { orientation: 'portrait' };
    ScreenOrientation.lock(options);
  }

}
