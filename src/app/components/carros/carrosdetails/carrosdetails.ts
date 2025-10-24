import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Carro } from '../../../models/carro';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Carroservice } from '../../../services/carroservice';
import { Marca } from '../../../models/marca';

@Component({
  selector: 'app-carrosdetails',
  standalone: true,
  imports: [MdbFormsModule, FormsModule],
  templateUrl: './carrosdetails.html',
  styleUrl: './carrosdetails.scss',
})

export class Carrosdetails {

  // com input 'carro' está visível de fora: pode ser referenciado por componentes 'html'
  @Input("carro") carro: Carro = new Carro(0, 0,"",0,"",0, new Marca(0,"",""));
  // saida de dados
  @Output("retorno") retorno: EventEmitter<any> = new EventEmitter<any>();

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
      next: retorno => {
        this.carro = retorno;
      },
      error: erro => {
        Swal.fire({
          title: 'Ocorreu um erro',
          icon: 'error',
          confirmButtonText: 'Ok',
        })
      }
    });

  }

  save() {
    if ((this.carro.id ?? 0) > 0) { // se for alteracao
      this.carroService.update(this.carro, this.carro.id!).subscribe({
        next: mensagem => {

          Swal.fire({
            title: mensagem,
            icon: 'success',
            confirmButtonText: 'Ok',
          });
          this.routerRedirect.navigate(['admin/carros'], { state: { carroEditado: this.carro } });
          this.retorno.emit(this.carro);
        },
        error: erro => {
          Swal.fire({
            title: 'Ocorreu um erro',
            icon: 'error',
            confirmButtonText: 'Ok',
          })
        }
      });

    } else { // se for inclusao
      this.carroService.save(this.carro).subscribe({
        next: mensagem => {
          Swal.fire({
            title: mensagem,
            icon: 'success',
            confirmButtonText: 'Ok',
          });
          this.routerRedirect.navigate(['admin/carros'], { state: { carroNovo: this.carro } });
          this.retorno.emit(this.carro);
        },
        error: erro => {
          Swal.fire({
            title: 'Ocorreu um erro',
            icon: 'error',
            confirmButtonText: 'Ok',
          })
        }
      });


    }

  }
}

