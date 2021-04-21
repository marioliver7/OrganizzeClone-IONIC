import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidacaoService {

  public erroTelefoneMaxCaractere; erroCaractereEspTelefone; erroStringTelefone; erroTelefoneCaractere; erroTamanhoNome; erroTamanhoSobrenome; erroNumeroSobrenome; erroNumeroNome; erroSemCaractereEspNome; erroSemCaractereEspSobrenome; erroSemNumero; erroCaractereEspecial; erroNumero; erroTamanho; erroCaracter; erroPonto; erroEmail; erroEmailConf; erroSenha; erroSenhaConf; erroNome; erroSobrenome; erroTelefone: boolean = false ;

  constructor() { }

  validarEmail(valor: string) {

    if(valor == undefined || valor == '') {
      this.erroEmail=true;
    } else {
      this.erroEmail=false;
    } 

    if(valor.search("@") == -1) {
      this.erroCaracter=true;
    } else {
      this.erroCaracter=false;
    } 
    
    if(valor.indexOf(".") == -1) {
      this.erroPonto=true;
    } else {
      this.erroPonto=false;
    }

    // if (valor==undefined || valor =='' || valor.search("@") == -1 || valor.indexOf(".")==-1){
    //   this.erroEmail=true;
    // }else{
    //   this.erroEmail=false;
    // }

  }

  validarRepetirEmail(valor: string, repetir: string) {
    if(valor !== repetir) {
      this.erroEmailConf = true;
    } else {
      this.erroEmailConf = false;
    }
  }

  validarPassword(valor: string){

    if(valor == undefined || valor == '') {
      this.erroSenha = true;
    } else {
      this.erroSenha = false;
    }

    if(valor.length <= 8 ) {
      this.erroTamanho = true;
    } else {
      this.erroTamanho = false;
    }

    if(valor.match(/[0-9]/) == null) {
      this.erroNumero = true;
    } else {
      this.erroNumero = false;
    }

    if(valor.match(/[@#$%&*ç+.=]/) == null) {
      this.erroCaractereEspecial = true;
    } else {
      this.erroCaractereEspecial = false;
    }
    // if (valor==undefined || valor =='' || valor.length <=8 || valor.match(/[0-9]/)==null|| valor.match(/[@#$%&*ç+.=]/)==null){
    //   this.erroSenha=true;
    // }else{
    //   this.erroSenha=false;
    // }

  }

  validarRepetirSenha(valor: string, repetir: string) {
    if(valor !== repetir) {
      this.erroSenhaConf = true;
    } else {
      this.erroSenhaConf = false;
    }
  }

  validarNome(valor: string){

    if(valor == undefined || valor == '') {
      this.erroNome = true;
    } else {
      this.erroNome = false;
    }

    if(valor.length <= 3 ) {
      this.erroTamanhoNome = true;
    } else {
      this.erroTamanhoNome = false;
    }

    if(valor.match(/[0-9]/) !== null) {
      this.erroNumeroNome = true;
    } else {
      this.erroNumeroNome = false;
    }

    if(valor.match(/[@#$%&*ç+.=]/)) {
      this.erroSemCaractereEspNome = true;
    } else {
      this.erroSemCaractereEspNome = false;
    }
    // if (valor==undefined || valor =='' || valor.length <=8 || valor.match(/[0-9]/)==null|| valor.match(/[@#$%&*ç+.=]/)==null){
    //   this.erroSenha=true;
    // }else{
    //   this.erroSenha=false;
    // }

  }

  validarSobrenome(valor: string){

    if(valor == undefined || valor == '') {
      this.erroSobrenome = true;
    } else {
      this.erroSobrenome = false;
    }

    if(valor.length <= 3 ) {
      this.erroTamanhoSobrenome = true;
    } else {
      this.erroTamanhoSobrenome = false;
    }

    if(valor.match(/[0-9]/) !== null) {
      this.erroNumeroSobrenome = true;
    } else {
      this.erroNumeroSobrenome = false;
    }

    if(valor.match(/[@#$%&*ç+.=]/)) {
      this.erroSemCaractereEspSobrenome = true;
    } else {
      this.erroSemCaractereEspSobrenome = false;
    }
    // if (valor==undefined || valor =='' || valor.length <=8 || valor.match(/[0-9]/)==null|| valor.match(/[@#$%&*ç+.=]/)==null){
    //   this.erroSenha=true;
    // }else{
    //   this.erroSenha=false;
    // }

  }

  validarTelefone(valor: string){

    if(valor == undefined || valor == '') {
      this.erroTelefone = true;
    } else {
      this.erroTelefone = false;
    }

    if(valor.length < 8 ) {
      this.erroTelefoneCaractere = true;
    } else {
      this.erroTelefoneCaractere = false;
    }

    if(valor.length > 8 ) {
      this.erroTelefoneMaxCaractere = true;
    } else {
      this.erroTelefoneMaxCaractere = false;
    }

    if(valor.match(/[a-z]/) !== null) {
      this.erroStringTelefone = true;
    } else {
      this.erroStringTelefone = false;
    }

    if(valor.match(/[@#$%&*ç+.=]/)) {
      this.erroCaractereEspTelefone = true;
    } else {
      this.erroCaractereEspTelefone = false;
    }

  }

}
