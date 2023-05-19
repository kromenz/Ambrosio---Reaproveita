import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-planeamento',
  templateUrl: './planeamento.page.html',
  styleUrls: ['./planeamento.page.scss'],
})
export class PlaneamentoPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onClick(x: any){
    this.router.navigateByUrl(x)
  }

}
