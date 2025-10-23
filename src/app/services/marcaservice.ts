import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Marca } from '../models/marca';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class Marcaservice {

  private http = inject(HttpClient);

  private API = 'http://localhost:8080/api/marca';

  constructor() {}

  save(marca: Marca): Observable<string> {
    // Cria uma cópia do carro para não alterar o original
    const marcaParaSalvar = { ...marca };

    // Remove o id se for 0, null ou undefined
    // se nao fizer isto vai dar erro de chave atribuida quando for inclusao
    // porque quem atribui a chave é o banco de dados
    if (!marcaParaSalvar.id || marcaParaSalvar.id === 0) {
      delete marcaParaSalvar.id;
    }


    return this.http.post<string>(this.API + '/save', marcaParaSalvar, {
      responseType: 'text' as 'json',
      withCredentials: true,
    });
  }

  listAll(): Observable<Marca[]> {
    return this.http.get<Marca[]>(this.API + '/listAll');
  }

  delete(id?: number): Observable<string> {
    if (!id) {
      throw new Error('ID inválido para exclusão');
    }
    return this.http.delete<string>(this.API + '/delete/' + id, {
       responseType: 'text' as 'json',
       withCredentials: true, });
  }

  update(marca: Marca, id: number): Observable<string> {
    return this.http.put<string>(this.API + '/update/' + id, marca, {
      responseType: 'text' as 'json',
      withCredentials: true,
    });
  }

  findById(id: number): Observable<Marca> {
    return this.http.get<Marca>(this.API + '/findById/' + id);
  }


}
