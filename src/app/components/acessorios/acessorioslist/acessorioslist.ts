import { Component, EventEmitter, inject, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { Acessorio } from '../../../models/acessorio';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { Acessorioservice } from '../../../services/acessorioservice';
import Swal from 'sweetalert2';
import { Acessoriosdetails } from "../acessoriosdetails/acessoriosdetails";

@Component({
  selector: 'app-acessorioslist',
  imports: [Acessoriosdetails],
  templateUrl: './acessorioslist.html',
  styleUrl: './acessorioslist.scss'
})
export class Acessorioslist {

  lista: Acessorio[] = [];
  acessorioEdit: Acessorio = new Acessorio(0,"");


  @Input("esconderBotoes") esconderBotes: boolean = false;
  @Output("retorno") retorno: EventEmitter<any> = new EventEmitter<any>();

  // elementos da modal
  modalService = inject(MdbModalService); // para conseguir abrir a modal
  @ViewChild('modalAcessorioDetalhe') modalAcessorioDetalhe!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;

  acessorioService = inject(Acessorioservice);

  constructor() {
    this.listAll();

    let acessorioNovo = history.state.acessorioNovo;
    let acessorioEditado = history.state.acessorioEditado;

    if (acessorioNovo) {
      acessorioNovo.id = 555;
      this.lista.push(acessorioNovo);
    }

    if (acessorioEditado) {
      let indice = this.lista.findIndex((x) => {
        return x.id == acessorioEditado.id;
      });
      this.lista[indice] = acessorioEditado;
    }
  }

  listAll() {
    this.acessorioService.listAll().subscribe({
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

  deleteById(acessorio: Acessorio) {
    Swal.fire({
      title: 'Tem certeza que deseja deletar este registro?',
      icon: 'warning',
      showConfirmButton: true,
      showDenyButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
    }).then((result) => {
      if (result.isConfirmed) {
        if (!acessorio.id) {
          Swal.fire({
            title: 'A marca selecionada não possui ID válido',
            icon: 'error',
            confirmButtonText: 'Ok',
          });
          return;
        }

        this.acessorioService.delete(acessorio.id).subscribe({
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
    this.acessorioEdit =  new Acessorio(0, "");
    this.modalRef = this.modalService.open(this.modalAcessorioDetalhe);
  }

  edit(acessorio: Acessorio) {
    this.acessorioEdit = Object.assign({}, acessorio); // clonando para evitar referencia ao objeto
    this.modalRef = this.modalService.open(this.modalAcessorioDetalhe);
  }

  retornoDetalhe(acessorio: Acessorio) {
    this.listAll();
    this.modalRef.close();
  }


  select(acessorio: Acessorio) {
    this.retorno.emit(acessorio);

}


}
