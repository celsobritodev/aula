export class Marca {

  id?: number;
  nome!: string;
  cnpj!: string;

 constructor(id: number,
             nome:string,
             cnpj:string) {
    this.id = id;
    this.nome = nome;
    this.cnpj = cnpj;

  }


}
