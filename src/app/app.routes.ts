import { Routes } from '@angular/router';
import { Login } from './components/layout/login/login';
import { Principal } from './components/layout/principal/principal';
import { Carroslist } from './components/carros/carroslist/carroslist';
import { Carrosdetails } from './components/carros/carrosdetails/carrosdetails';

export const routes: Routes = [
  {path: "", redirectTo: "login", pathMatch: 'full'},
  {path: "login", component : Login},
  {path: "admin", component: Principal, children: [
    {path: "carros", component: Carroslist},
    {path: "carros/new", component :Carrosdetails },
    {path: "carros/edit/:id", component: Carrosdetails}
  ]}
];
