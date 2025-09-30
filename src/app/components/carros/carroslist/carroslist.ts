import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { Carro } from '../../../models/carro';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { Carrosdetails } from "../carrosdetails/carrosdetails";

@Component({
  selector: 'app-carroslist',
  standalone: true,
  imports: [RouterLink, MdbModalModule, Carrosdetails],
  templateUrl: './carroslist.html',
  styleUrl: './carroslist.scss',
})
export class Carroslist {
  lista: Carro[] = [];
  carroEdit: Carro = new Carro(0,"");

   // elementos da modal
   modalService = inject(MdbModalService); // para conseguir abrir a modal
   @ViewChild("modalCarroDetalhe") modalCarroDetalhe!: TemplateRef<any>;
   modalRef!: MdbModalRef<any>;



  constructor() {
    this.lista.push(new Carro(1, 'Fiesta'));
    this.lista.push(new Carro(2, 'Monza'));
    this.lista.push(new Carro(3, 'Ka'));


    let carroNovo = history.state.carroNovo;
    let carroEditado = history.state.carroEditado;

    if (carroNovo) {
      carroNovo.id = 555;
      this.lista.push(carroNovo);
    }

    if (carroEditado) {
      let indice = this.lista.findIndex((x) => {
        return x.id == carroEditado.id;
      });
      this.lista[indice] = carroEditado;
    }
  }

  deleteById(carro: Carro) {
    Swal.fire({
      title: 'Tem certeza que deseja deletar este registro?',
      icon: 'warning',
      showConfirmButton: true,
      showDenyButton: true,
      confirmButtonText: "Sim",
      cancelButtonText: "Não",
    }).then((result) => {
      if (result.isConfirmed) {
        let indice = this.lista.findIndex((arrElem) => {return arrElem.id == carro.id});
        this.lista.splice(indice, 1);
        Swal.fire({
          title: 'Deletado com sucesso!',
          icon: 'warning',
          showConfirmButton: true,
          confirmButtonText: 'Ok'
        });
      }
    });
  }

 new() {
  this.carroEdit = new Carro(0,"");
  this.modalRef = this.modalService.open(this.modalCarroDetalhe);
 }

 edit(carro:Carro) {
  this.carroEdit = Object.assign({},carro); // clonando para evitar referencia ao objeto
  this.modalRef = this.modalService.open(this.modalCarroDetalhe);
 }

 retornoDetalhe(carro: Carro) {

  if(carro.id>0) { // o carro ja existe
    let indice = this.lista.findIndex( x=> {return x.id == carro.id});
    this.lista[indice] = carro;
  } else {
    carro.id = 55; // atribui id ao novo carro
    this.lista.push(carro);
  }

  this.modalRef.close();

 }

}
