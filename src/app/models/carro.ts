export class Carro {

  id?: number;
  ano?: number;
  nome!: string;
  marca_id?: number;
  marca?: string;
  modelo?: string;
  anoFabricacao?: number;


  constructor(id: number,
              ano:number,
              nome:string,
              marca_id:number,
              marca:string,
              modelo:string,
              anoFabricacao:number) {
    this.id = id;
    this.ano=ano;
    this.nome = nome;
    this.marca_id=marca_id;
    this.modelo=modelo;
    this.anoFabricacao=anoFabricacao;

  }


}
