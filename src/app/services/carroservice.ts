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

  private prepararCarroParaEnvio(carro: Carro): any {
  // Cria o objeto base do carro
  const carroParaSalvar: any = {
    id: carro.id && carro.id > 0 ? carro.id : undefined,
    nome: carro.nome,
    ano: carro.ano,
    modelo: carro.modelo,
    anoFabricacao: carro.anoFabricacao
  };

  // DEBUG: Verifique o que temos disponível
  console.log('DEBUG - Carro original:', carro);
  console.log('DEBUG - marca_id:', carro.marca_id);
  console.log('DEBUG - marca object:', carro.marca);
  console.log('DEBUG - marca id from object:', carro.marca?.id);

  // LÓGICA CORRIGIDA: Envia o objeto marca com apenas o ID
  let marcaId: number | undefined;

  // Prioridade 1: marca_id direto
  if (carro.marca_id && carro.marca_id > 0) {
    marcaId = carro.marca_id;
  }
  // Prioridade 2: id do objeto marca
  else if (carro.marca && carro.marca.id && carro.marca.id > 0) {
    marcaId = carro.marca.id;
  }

  // Se encontrou um ID válido, envia o objeto marca
  if (marcaId) {
    carroParaSalvar.marca = {
      id: marcaId
    };
    console.log('DEBUG - Enviando marca com ID:', marcaId);
  } else {
    console.log('DEBUG - Nenhum ID de marca válido encontrado');
  }

  // Remove propriedades undefined
  Object.keys(carroParaSalvar).forEach(key => {
    if (carroParaSalvar[key] === undefined) {
      delete carroParaSalvar[key];
    }
  });

  console.log('Carro preparado para envio:', carroParaSalvar);
  return carroParaSalvar;
}







  save(carro: Carro): Observable<string> {
    const carroParaSalvar = this.prepararCarroParaEnvio(carro);

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
      withCredentials: true,
    });
  }

  update(carro: Carro, id: number): Observable<string> {
    const carroParaAtualizar = this.prepararCarroParaEnvio(carro);

    return this.http.put<string>(this.API + '/update/' + id, carroParaAtualizar, {
      responseType: 'text' as 'json',
      withCredentials: true,
    });
  }

  findById(id: number): Observable<Carro> {
    return this.http.get<Carro>(this.API + '/findById/' + id);
  }
}
