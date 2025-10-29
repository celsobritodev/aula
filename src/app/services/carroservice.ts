import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Carro } from '../models/carro';

@Injectable({
  providedIn: 'root',
})

export class Carroservice {

  private http = inject(HttpClient);

  private API = 'http://localhost:8080/api/carro';

  constructor() {}

  

  save(carro: Carro): Observable<string> {
    // Cria uma cópia do carro para não alterar o original
    const carroParaSalvar = { ...carro };

    // Remove o id se for 0, null ou undefined
    // se nao fizer isto vai dar erro de chave atribuida quando for inclusao
    // porque quem atribui a chave é o banco de dados
    if (!carroParaSalvar.id || carroParaSalvar.id === 0) {
      delete carroParaSalvar.id;
    }

    return this.http.post<string>(this.API + '/save', carroParaSalvar, {
      responseType: 'text' as 'json',
      withCredentials: true,
    });
  }

  listAll(): Observable<Carro[]> {
    return this.http.get<Carro[]>(this.API + '/listAll');
  }

  delete(id?: number): Observable<string> {
    if (!id) {
      throw new Error('ID inválido para exclusão');
    }
    return this.http.delete<string>(this.API + '/delete/' + id, {
       responseType: 'text' as 'json',
       withCredentials: true, });
  }

  update(carro: Carro, id: number): Observable<string> {
    return this.http.put<string>(this.API + '/update/' + id, carro, {
      responseType: 'text' as 'json',
      withCredentials: true,
    });
  }

  findById(id: number): Observable<Carro> {
    return this.http.get<Carro>(this.API + '/findById/' + id);
  }
}
