import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Marca } from '../../../models/marca';
import { Marcaservice } from '../../../services/marcaservice';
import Swal from 'sweetalert2';
import { MdbFormsModule } from "mdb-angular-ui-kit/forms";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-marcasdetails',
  standalone: true,
  imports: [MdbFormsModule,FormsModule],
  templateUrl: './marcasdetails.html',
  styleUrl: './marcasdetails.scss'
})


export class Marcasdetails {

  // com input 'carro' está visível de fora: pode ser referenciado por componentes 'html'
  @Input("marca") marca: Marca = new Marca(0, "","");
  // saida de dados
  @Output("retorno") retorno: EventEmitter<any> = new EventEmitter<any>();

  routerRotaAtivada = inject(ActivatedRoute); // pega um parametro de rota
  routerRedirect = inject(Router); // para fazer redirecionamento

  marcaService = inject(Marcaservice);

  constructor() {
    let id = this.routerRotaAtivada.snapshot.params['id'];
    if (id > 0) {
      this.findById(id);
    }
  }



  findById(id: number) {

    this.marcaService.findById(id).subscribe({
      next: retorno => {
        this.marca = retorno;
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
    if ((this.marca.id ?? 0) > 0) { // se for alteracao
      this.marcaService.update(this.marca, this.marca.id!).subscribe({
        next: mensagem => {

          Swal.fire({
            title: mensagem,
            icon: 'success',
            confirmButtonText: 'Ok',
          });
          this.routerRedirect.navigate(['admin/marcas'], { state: { marcaEditada: this.marca } });
          this.retorno.emit(this.marca);
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
      this.marcaService.save(this.marca).subscribe({
        next: mensagem => {
          Swal.fire({
            title: mensagem,
            icon: 'success',
            confirmButtonText: 'Ok',
          });
          this.routerRedirect.navigate(['admin/marcas'], { state: { marcaNova: this.marca } });
          this.retorno.emit(this.marca);
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
