import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { ListaService } from 'src/app/services/lista/lista.service';

export interface Prod{
  produtos:string,
  categoria:string
}

@Component({
  selector: 'app-lista-compras',
  templateUrl: './lista-compras.page.html',
  styleUrls: ['./lista-compras.page.scss'],
})
export class ListaComprasPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onClick(x: any){
    this.router.navigateByUrl(x);
  }

}
