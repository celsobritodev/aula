import {
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Carro } from '../../../models/carro';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Carroservice } from '../../../services/carroservice';
import { Marca } from '../../../models/marca';
import { Marcaslist } from '../../marcas/marcaslist/marcaslist';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-carrosdetails',
  standalone: true,
  imports: [MdbFormsModule, FormsModule, Marcaslist],
  templateUrl: './carrosdetails.html',
  styleUrl: './carrosdetails.scss',
})
export class Carrosdetails {
  // com input 'carro' está visível de fora: pode ser referenciado por componentes 'html'
  @Input('carro') carro: Carro = new Carro(0, 0, '', 0, '', 0, null);
  // saida de dados
  @Output('retorno') retorno: EventEmitter<any> = new EventEmitter<any>();

  // elementos da modal
  modalService = inject(MdbModalService); // para conseguir abrir a modal
  @ViewChild('modalMarcas') modalMarcas!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;

  routerRotaAtivada = inject(ActivatedRoute); // pega um parametro de rota
  routerRedirect = inject(Router); // para fazer redirecionamento

  carroService = inject(Carroservice);

  constructor() {
    let id = this.routerRotaAtivada.snapshot.params['id'];
    if (id > 0) {
      this.findById(id);
    }
  }

  findById(id: number) {
    this.carroService.findById(id).subscribe({
      next: (retorno) => {
        this.carro = retorno;
      },
      error: (erro) => {
        Swal.fire({
          title: 'Ocorreu um erro',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      },
    });
  }

  save() {
    // DEBUG: Verifique o estado do carro antes de salvar
    console.log('ANTES DE SALVAR - Carro completo:', this.carro);
    console.log('ANTES DE SALVAR - marca_id:', this.carro.marca_id);
    console.log('ANTES DE SALVAR - marca object:', this.carro.marca);
    console.log('ANTES DE SALVAR - marca id:', this.carro.marca?.id);

    // ANTES DE SALVAR: Garante que o marca_id está sincronizado com o objeto marca
    if (this.carro.marca && this.carro.marca.id) {
      this.carro.marca_id = this.carro.marca.id;
    }
    if ((this.carro.id ?? 0) > 0) {
      // se for alteracao
      this.carroService.update(this.carro, this.carro.id!).subscribe({
        next: (mensagem) => {
          Swal.fire({
            title: mensagem,
            icon: 'success',
            confirmButtonText: 'Ok',
          });
          this.routerRedirect.navigate(['admin/carros'], { state: { carroEditado: this.carro } });
          this.retorno.emit(this.carro);
        },
        error: (erro) => {
          Swal.fire({
            title: 'Ocorreu um erro',
            icon: 'error',
            confirmButtonText: 'Ok',
          });
        },
      });
    } else {
      // se for inclusao
      this.carroService.save(this.carro).subscribe({
        next: (mensagem) => {
          Swal.fire({
            title: mensagem,
            icon: 'success',
            confirmButtonText: 'Ok',
          });
          this.routerRedirect.navigate(['admin/carros'], { state: { carroNovo: this.carro } });
          this.retorno.emit(this.carro);
        },
        error: (erro) => {
          Swal.fire({
            title: 'Ocorreu um erro',
            icon: 'error',
            confirmButtonText: 'Ok',
          });
        },
      });
    }
  }

  buscarMarca() {
    this.modalRef = this.modalService.open(this.modalMarcas, { modalClass: 'modal-lg' });
  }

  retornoMarca(marca: Marca) {
    console.log('Marca selecionada:', marca);

    this.carro.marca = marca;
    this.carro.marca_id = marca.id;

    console.log('Carro após selecionar marca:', this.carro);
    console.log('marca_id definido como:', this.carro.marca_id);

    this.modalRef.close();
  }

  
}
