import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidacaoService {

  public erroEmail; erroEmailConf; erroSenha; erroSenhaConf; erroNome; erroSobrenome; erroTelefone: boolean =false ;

  constructor() { }

  validarEmail(valor: string) {

    if (valor==undefined || valor =='' || valor.search("@") == -1 || valor.indexOf(".")==-1){
      this.erroEmail=true;
    }else{
      this.erroEmail=false;
    }

  }

  validarPassword(valor: string){
    if (valor==undefined || valor =='' || valor.length <=8 || valor.match(/[0-9]/)==null|| valor.match(/[@#$%&*ç+.=]/)==null){
      this.erroSenha=true;
    }else{
      this.erroSenha=false;
    }

  }
}
