import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Acessorio } from '../../../models/acessorio';
import { ActivatedRoute, Router } from '@angular/router';
import { Acessorioservice } from '../../../services/acessorioservice';
import Swal from 'sweetalert2';
import { MdbFormsModule } from "mdb-angular-ui-kit/forms";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-acessoriosdetails',
  imports: [MdbFormsModule,FormsModule],
  templateUrl: './acessoriosdetails.html',
  styleUrl: './acessoriosdetails.scss'
})
export class Acessoriosdetails {

   // com input 'carro' está visível de fora: pode ser referenciado por componentes 'html'
  @Input("acessorio") acessorio: Acessorio = new Acessorio(0, "");
  // saida de dados
  @Output("retorno") retorno: EventEmitter<any> = new EventEmitter<any>();

  routerRotaAtivada = inject(ActivatedRoute); // pega um parametro de rota
  routerRedirect = inject(Router); // para fazer redirecionamento

  acessorioService = inject(Acessorioservice);

  constructor() {
    let id = this.routerRotaAtivada.snapshot.params['id'];
    if (id > 0) {
      this.findById(id);
    }
  }



  findById(id: number) {

    this.acessorioService.findById(id).subscribe({
      next: retorno => {
        this.acessorio = retorno;
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
    if ((this.acessorio.id ?? 0) > 0) { // se for alteracao
      this.acessorioService.update(this.acessorio, this.acessorio.id!).subscribe({
        next: mensagem => {

          Swal.fire({
            title: mensagem,
            icon: 'success',
            confirmButtonText: 'Ok',
          });
          this.routerRedirect.navigate(['admin/acessorios'], { state: { acessorioEditado: this.acessorio } });
          this.retorno.emit(this.acessorio);
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
      this.acessorioService.save(this.acessorio).subscribe({
        next: mensagem => {
          Swal.fire({
            title: mensagem,
            icon: 'success',
            confirmButtonText: 'Ok',
          });
          this.routerRedirect.navigate(['admin/acessorios'], { state: { acessorioNovo: this.acessorio } });
          this.retorno.emit(this.acessorio);
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
