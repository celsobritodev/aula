import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';

@Component({
  selector: 'app-login',
  standalone: true,
imports: [
    MdbFormsModule, FormsModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {

  usuario!: string;
  senha!: string;

  router = inject(Router);

  logar() {
    if(this.usuario=='admin' && this.senha=='admin') {
      // redirecionar para carroslist
      this.router.navigate(['admin/carros'])
    } else
      alert('Usuario ou senha estão incorretos!')
  }


}
