import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Carro } from '../../../models/carro';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  standalone: true,
  imports: [MdbFormsModule, FormsModule],
  templateUrl: './carrosdetails.html',
  styleUrl: './carrosdetails.scss',
})
export class Carrosdetails {
  @Input("carro") carro: Carro = new Carro(0, "");
  @Output("retorno") retorno: EventEmitter<any> = new EventEmitter<any>();
  routerRotaAtivada = inject(ActivatedRoute); // pega um parametro de rota
  routerRedirect = inject(Router); // para fazer redirecionamento

  constructor() {
    let id = this.routerRotaAtivada.snapshot.params['id'];
    if (id > 0) {
      this.findById(id);
    }
  }

  findById(id: number) {
    // busca no back end
    let carroRetornado: Carro = new Carro(id, 'Fiesta');
    this.carro = carroRetornado;
  }

  save() {
    if (this.carro.id > 0) {
      Swal.fire({
        title: 'Sucesso!',
        text: 'Editado com sucesso!',
        icon: 'success',
        confirmButtonText: 'Ok',
      });
      this.routerRedirect.navigate(['admin/carros'], { state: { carroEditado: this.carro } });
    } else {
      Swal.fire({
        title: 'Sucesso!',
        text: 'Salvo com sucesso!',
        icon: 'success',
        confirmButtonText: 'Ok',
      });
      this.routerRedirect.navigate(['admin/carros'], { state: { carroNovo: this.carro } });
    }
       this.retorno.emit(this.carro);
  }
}

