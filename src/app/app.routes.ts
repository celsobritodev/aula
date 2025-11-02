import { Routes } from '@angular/router';
import { Login } from './components/layout/login/login';
import { Principal } from './components/layout/principal/principal';
import { Carroslist } from './components/carros/carroslist/carroslist';
import { Carrosdetails } from './components/carros/carrosdetails/carrosdetails';
import { Marcaslist } from './components/marcas/marcaslist/marcaslist';
import { Marcasdetails } from './components/marcas/marcasdetails/marcasdetails';
import { Acessorioslist } from './components/acessorios/acessorioslist/acessorioslist';
import { Acessoriosdetails } from './components/acessorios/acessoriosdetails/acessoriosdetails';

export const routes: Routes = [
  {path: "", redirectTo: "login", pathMatch: 'full'},
  {path: "login", component : Login},
  
  {path: "admin", component: Principal, children: [
    {path: "carros", component: Carroslist},
    {path: "carros/new", component :Carrosdetails },
    {path: "carros/edit/:id", component: Carrosdetails},
    {path: "marcas", component: Marcaslist},
    {path: "marcas/new", component :Marcasdetails },
    {path: "marcas/edit/:id", component: Marcasdetails},
    {path: "acessorios", component: Acessorioslist},
    {path: "acessorios/new", component :Acessoriosdetails },
    {path: "acessorios/edit/:id", component: Acessoriosdetails},
  ]}
];
