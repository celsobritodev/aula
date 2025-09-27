import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Carro } from '../../../models/carro';

@Component({
  selector: 'app-carrosdetails',
  imports: [
    MdbFormsModule, FormsModule
  ],
  templateUrl: './carrosdetails.html',
  styleUrl: './carrosdetails.scss'
})
export class Carrosdetails {

  carro: Carro = new Carro(0,"");


  save() {
    alert("Salvo");
  }


}
