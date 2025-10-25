import { Component, EventEmitter, inject, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { Marca } from '../../../models/marca';

import { Marcasdetails } from '../marcasdetails/marcasdetails';
import { Marcaservice } from '../../../services/marcaservice';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-marcaslist',
  imports: [MdbModalModule, Marcasdetails],
  templateUrl: './marcaslist.html',
  styleUrl: './marcaslist.scss'
})



export class Marcaslist {


  lista: Marca[] = [];
  marcaEdit: Marca = new Marca(0,"","");


  @Input("esconderBotoes") esconderBotes: boolean = false;
  @Output("retorno") retorno: EventEmitter<any> = new EventEmitter<any>();

  // elementos da modal
  modalService = inject(MdbModalService); // para conseguir abrir a modal
  @ViewChild('modalMarcaDetalhe') modalMarcaDetalhe!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;

  marcaService = inject(Marcaservice);

  constructor() {
    this.listAll();

    let marcaNova = history.state.marcaNova;
    let marcaEditada = history.state.marcaEditada;

    if (marcaNova) {
      marcaNova.id = 555;
      this.lista.push(marcaNova);
    }

    if (marcaEditada) {
      let indice = this.lista.findIndex((x) => {
        return x.id == marcaEditada.id;
      });
      this.lista[indice] = marcaEditada;
    }
  }

  listAll() {
    this.marcaService.listAll().subscribe({
      // quando o back retornar o que se espera
      next: (listaBack) => {
        this.lista = listaBack;
      },
      error: (erro) => {
        // quando ocorrer qualquer erro (badrequest, exceptions)
        Swal.fire({
          title: 'Ocorreu um erro',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      },
    });
  }

  deleteById(marca: Marca) {
    Swal.fire({
      title: 'Tem certeza que deseja deletar este registro?',
      icon: 'warning',
      showConfirmButton: true,
      showDenyButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
    }).then((result) => {
      if (result.isConfirmed) {
        if (!marca.id) {
          Swal.fire({
            title: 'A marca selecionada não possui ID válido',
            icon: 'error',
            confirmButtonText: 'Ok',
          });
          return;
        }

        this.marcaService.delete(marca.id).subscribe({
          next: (mensagem) => {
            Swal.fire({
              title: mensagem,
              icon: 'success',
              confirmButtonText: 'Ok',
            });
            this.listAll();
          },
          error: (erro) => {
            // quando ocorrer qualquer erro (badrequest, exceptions)
            Swal.fire({
              title: 'Ocorreu um erro',
              icon: 'error',
              confirmButtonText: 'Ok',
            });
          },
        });
      }
    });
  }

  new() {
    this.marcaEdit =  new Marca(0, "","");
    this.modalRef = this.modalService.open(this.modalMarcaDetalhe);
  }

  edit(marca: Marca) {
    this.marcaEdit = Object.assign({}, marca); // clonando para evitar referencia ao objeto
    this.modalRef = this.modalService.open(this.modalMarcaDetalhe);
  }

  retornoDetalhe(marca: Marca) {
    this.listAll();
    this.modalRef.close();
  }


  select(marca: Marca) {
    this.retorno.emit(marca);

}


}
