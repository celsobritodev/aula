import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Loginmodel } from '../../../auth/loginmodel';
import { LoginService } from '../../../auth/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MdbFormsModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  loginModel: Loginmodel = new Loginmodel();
  //usuario!: string;
 // senha!: string;

  router = inject(Router);
  loginService = inject(LoginService);

 constructor() {
  this.loginService.removerToken();
 }


  logar() {

    this.loginService.logar(this.loginModel).subscribe({
      next: token => {
        console.log(token);
        if(token) { // o usuario e senha digitados estavam corretos
          this.loginService.addToken(token);
          if(this.loginService.hasRole('ADMIN'))
           this.router.navigate(['/admin/carros']);
          else if(this.loginService.hasRole('USER'))
            this.router.navigate(['/admin/marcas']);
        } else { // ou o usuario ou a senha estao incorretos
          alert('usuário ou senha incorretos')
        }

      },
      error: erro => {
        alert('deu erro');
      }
    })

  }
}
