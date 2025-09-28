import { Component } from '@angular/core';
import { Carro } from '../../../models/carro';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-carroslist',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './carroslist.html',
  styleUrl: './carroslist.scss',
})
export class Carroslist {
  lista: Carro[] = [];

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
        let indice = this.lista.findIndex((x) => {
          return x.id == carro.id;
        });
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
}
