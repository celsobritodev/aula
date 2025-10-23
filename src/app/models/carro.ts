export class Carro {

  id?: number;
  ano?: number; // a interrogacao indica que o campo e opcional
  nome!: string; // a exclamação indica que o campo é obrigatório
  marca_id?: number;
  modelo?: string;
  anoFabricacao?: number;


  constructor(id: number,
              ano:number,
              nome:string,
              marca_id:number,
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
