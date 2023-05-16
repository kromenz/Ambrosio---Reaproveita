import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pag-ini',
  templateUrl: './pag-ini.page.html',
  styleUrls: ['./pag-ini.page.scss'],
})
export class PagIniPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onClick(x: any){
    this.router.navigateByUrl(x)
  }
}
