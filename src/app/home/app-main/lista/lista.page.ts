import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonAccordionGroup } from '@ionic/angular';
import { ListaService } from 'src/app/services/lista/lista.service';

interface List {
  produtos: string[];
  categoria: string,
  imagem:string
};

@Component({
  selector: 'app-lista',
  templateUrl: './lista.page.html',
  styleUrls: ['./lista.page.scss'],
})
export class ListaPage implements OnInit {

  
  public dataList: List [] = []

  @ViewChild('accordionGroup', { static: true }) accordionGroup: IonAccordionGroup | undefined;
  constructor(private router: Router) { }

  ngOnInit() {
    this.loadList()
  }

  onClick(x: any){
    this.router.navigateByUrl(x)
  }


  loadList(){
    fetch('./assets/data/lista_produtos.json')
      .then((response) => response.json())
      .then((json) => {
        if(Array.isArray(json)){
          this.dataList = json;
          console.log('list data loaded', this.dataList);
        } else {
          console.log('list data is empty');
        }
      }).catch((error) => {
        console.log('error loading list data |', error);
      });
  }
  
}
