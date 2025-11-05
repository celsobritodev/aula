import { inject, Injectable } from '@angular/core';
import { Acessorio } from '../models/acessorio';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Acessorioservice {

  private http = inject(HttpClient);

  private API = environment.SERVIDOR+'/api/acessorio';

  constructor() {}

  save(acessorio: Acessorio): Observable<string> {
    // Cria uma cópia do carro para não alterar o original
    const acessorioParaSalvar = { ...acessorio };

    // Remove o id se for 0, null ou undefined
    // se nao fizer isto vai dar erro de chave atribuida quando for inclusao
    // porque quem atribui a chave é o banco de dados
    if (!acessorioParaSalvar.id || acessorioParaSalvar.id === 0) {
      delete acessorioParaSalvar.id;
    }


    return this.http.post<string>(this.API + '/save', acessorioParaSalvar, {
      responseType: 'text' as 'json',
      withCredentials: true,
    });
  }

  listAll(): Observable<Acessorio[]> {
    return this.http.get<Acessorio[]>(this.API + '/listAll');
  }

  delete(id?: number): Observable<string> {
    if (!id) {
      throw new Error('ID inválido para exclusão');
    }
    return this.http.delete<string>(this.API + '/delete/' + id, {
       responseType: 'text' as 'json',
       withCredentials: true, });
  }

  update(acessorio: Acessorio, id: number): Observable<string> {
    return this.http.put<string>(this.API + '/update/' + id, acessorio, {
      responseType: 'text' as 'json',
      withCredentials: true,
    });
  }

  findById(id: number): Observable<Acessorio> {
    return this.http.get<Acessorio>(this.API + '/findById/' + id);
  }


}
