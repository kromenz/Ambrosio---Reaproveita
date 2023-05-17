import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.page.html',
  styleUrls: ['./produtos.page.scss'],
})
export class ProdutosPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onClick(x: any){
    this.router.navigateByUrl(x)
  }

}
