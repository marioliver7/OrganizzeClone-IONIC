import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidacaoService {

  public erroEmail; erroEmailConf; erroSenha; erroSenhaConf; erroNome; erroSobrenome; erroTelefone: boolean = false;

  public msgErroPassword: string = "*Senha inválida";

  constructor() { }

  validarEmail(valor: string) {

    if(valor == undefined || valor == '') {
      this.erroEmail=true;
    } else {
      this.erroEmail=false;
    } 
  }

  // validarRepetirEmail(valor: string, repetir: string) {
  //   if(valor !== repetir) {
  //     this.erroEmailConf = true;
  //   } else {
  //     this.erroEmailConf = false;
  //   }
  // }

  validarPassword(valor: string){

    if(valor == undefined || valor == '') {
      this.erroSenha = true;
      this.msgErroPassword = "*Senha inválida"
      return false;
    } else {
      this.erroSenha = false;
    }

    if(valor.length <= 8) {
      this.erroSenha = true;
      this.msgErroPassword = "*A senha deve ter mais de 8 caracteres";
      return false;
    } else {
      this.erroSenha = false;
    }

    if(valor.match(/[0-9]/)==null) {
      this.erroSenha = true;
      this.msgErroPassword = "*A senha deve ter pelo menos um número";
      return false;
    } else {
      this.erroSenha = false;
    }

    if(valor.match(/[@#$%&*ç+.=]/)==null) {
      this.erroSenha = true;
      this.msgErroPassword = "*A senha deve ter pelo menos um caracter especial";
      return false;
    } else {
      this.erroSenha = false;
    }
  }

  // validarRepetirSenha(valor: string, repetir: string) {
  //   if(valor !== repetir) {
  //     this.erroSenhaConf = true;
  //   } else {
  //     this.erroSenhaConf = false;
  //   }
  // }

  validarNome(valor: string){

    if(valor == undefined || valor == '') {
      this.erroNome = true;
    } else {
      this.erroNome = false;
    }

  }

  validarSobrenome(valor: string){

    if(valor == undefined || valor == '') {
      this.erroSobrenome = true;
    } else {
      this.erroSobrenome = false;
    }

  }

  validarTelefone(valor: string){

    if(valor == undefined || valor == '') {
      this.erroTelefone = true;
    } else {
      this.erroTelefone = false;
    }

  }

}
