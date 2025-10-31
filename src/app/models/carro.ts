import { Acessorio } from "./acessorio";
import { Marca } from "./marca";

export class Carro {

  id?: number;
  ano?: number; // a interrogacao indica que o campo e opcional
  nome!: string; // a exclamação indica que o campo é obrigatório
  marca_id?: number;
  modelo?: string;
  anoFabricacao?: number;
  marca : Marca | null =null; // permite null
  acessorios: Acessorio[] = [];


  constructor(id: number,
              ano:number,
              nome:string,
              marca_id:number,
              modelo:string,
              anoFabricacao:number,
              marca:Marca | null,
              acessorios: Acessorio[] =[]) {
                
    this.id = id;
    this.ano=ano;
    this.nome = nome;
    this.marca_id=marca_id;
    this.modelo=modelo;
    this.anoFabricacao=anoFabricacao;
    this.marca = marca;
    this.acessorios = acessorios;

  }


}
