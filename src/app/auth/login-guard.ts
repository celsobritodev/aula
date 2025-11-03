import { CanActivateFn } from '@angular/router';
import { LoginService } from './login.service';
import { inject } from '@angular/core';

export const loginGuard: CanActivateFn = (route, state) => {

  let loginService = inject(LoginService);

  if(loginService.hasRole("USER") && state.url == '/admin/carros') {
    alert('Você não tem permissão de acesso a essa rota!');
    return false;
  }

  return true;
};
