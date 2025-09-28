import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Carro } from '../../../models/carro';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-carrosdetails',
  imports: [MdbFormsModule, FormsModule],
  templateUrl: './carrosdetails.html',
  styleUrl: './carrosdetails.scss',
})
export class Carrosdetails {
  carro: Carro = new Carro(0, '');
  router = inject(ActivatedRoute); // pega um parametro de rota
  router2 = inject(Router); // para fazer redirecionamento

  constructor() {
    let id = this.router.snapshot.params['id'];
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
      this.router2.navigate(['admin/carros'], { state: { carroEditado: this.carro } });
    } else {
      Swal.fire({
        title: 'Sucesso!',
        text: 'Salvo com sucesso!',
        icon: 'success',
        confirmButtonText: 'Ok',
      });
      this.router2.navigate(['admin/carros'], { state: { carroNovo: this.carro } });
    }
  }
}

