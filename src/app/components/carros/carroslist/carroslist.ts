import { Component } from '@angular/core';
import { Carro } from '../../../models/carro';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-carroslist',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './carroslist.html',
  styleUrl: './carroslist.scss'
})
export class Carroslist {


  lista: Carro[] = [];

  constructor() {
    this.lista.push(new Carro(1,'Fiesta'));
    this.lista.push(new Carro(2,'Monza'));
    this.lista.push(new Carro(3,'Ka'));
  }

  deletar() {
throw new Error('Method not implemented.');
}

}
