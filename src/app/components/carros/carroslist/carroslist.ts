import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { Carro } from '../../../models/carro';
import Swal from 'sweetalert2';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { Carrosdetails } from '../carrosdetails/carrosdetails';
import { Carroservice } from '../../../services/carroservice';
import { Marca } from '../../../models/marca';

@Component({
  selector: 'app-carroslist',
  standalone: true,
  imports: [MdbModalModule, Carrosdetails],
  templateUrl: './carroslist.html',
  styleUrl: './carroslist.scss',
})



export class Carroslist {
  lista: Carro[] = [];
  carroEdit: Carro = new Carro(0, 0,"",0,"",0, null);

  // elementos da modal
  modalService = inject(MdbModalService); // para conseguir abrir a modal
  @ViewChild('modalCarroDetalhe') modalCarroDetalhe!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;

  carroService = inject(Carroservice);

  constructor() {
    this.listAll();

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

  listAll() {
    this.carroService.listAll().subscribe({
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

  deleteById(carro: Carro) {
    Swal.fire({
      title: 'Tem certeza que deseja deletar este registro?',
      icon: 'warning',
      showConfirmButton: true,
      showDenyButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
    }).then((result) => {
      if (result.isConfirmed) {
        if (!carro.id) {
          Swal.fire({
            title: 'O carro selecionado não possui ID válido',
            icon: 'error',
            confirmButtonText: 'Ok',
          });
          return;
        }

        this.carroService.delete(carro.id).subscribe({
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
      // Novo carro com marca = null (será definido no details)
    this.carroEdit =  new Carro(0, 0,"",0,"",0, null);
    this.modalRef = this.modalService.open(this.modalCarroDetalhe);
  }

  edit(carro: Carro) {
    this.carroEdit = Object.assign({}, carro); // clonando para evitar referencia ao objeto
    this.modalRef = this.modalService.open(this.modalCarroDetalhe);
  }

  retornoDetalhe(carro: Carro) {
    this.listAll();
    this.modalRef.close();
  }
}
