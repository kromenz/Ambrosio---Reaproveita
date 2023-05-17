import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-app-main',
  templateUrl: './app-main.page.html',
  styleUrls: ['./app-main.page.scss'],
})
export class AppMainPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onClick(x: any){
    this.router.navigateByUrl(x)
  }

}
