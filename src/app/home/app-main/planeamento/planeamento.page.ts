import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Planeamento, PlaneamentoService } from 'src/app/services/planeamento.service';

@Component({
  selector: 'app-planeamento',
  templateUrl: './planeamento.page.html',
  styleUrls: ['./planeamento.page.scss'],
})
export class PlaneamentoPage implements OnInit {

  listData: Planeamento[] = [];

  constructor(private router: Router, private planSV: PlaneamentoService) { }

  ngOnInit() {
    this.loadData();
  }

  onClick(x: any){
    this.router.navigateByUrl(x)
  }

  async loadData(){
    this.listData = await this.planSV.getPlaneamento();
  }

}
