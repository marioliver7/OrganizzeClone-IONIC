import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { CameraService } from '../service/camera.service';
import { GeralService } from '../service/geral.service';
import { ValidacaoService } from '../service/validacao.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  public usuario: any;

  public email; emailConfir; password; passwordConfir: string="";

  public nome; sobrenome; genero="F"; nasc="2010/01/01"; telefone: string;

  public cep; endereco; numero; complemento; bairro; cidade: string;

  public erroEmail; erroEmailConf; erroSenha; erroSenhaConf; erroNome; erroSobrenome; erroTelefone: boolean = false;

  constructor(public geralCtrl: GeralService, public validacaoCtrl: ValidacaoService, public cameractrl: CameraService) { }

  ngOnInit() {
  }

  exibirCep(cep) {
    this.geralCtrl.carregarCep(cep)
    .then ((response:any) => {
      this.endereco = response.logradouro;
      this.bairro = response.bairro;
      this.cidade = response.localidade;
    })
    .catch ((response:any) => {
      alert("CEP incorreto")
    })
  }

  formatarData() {
    var data = this.nasc.split("T");
    this.nasc = data[0];
  }

  masktelefone(valor: string) {
    valor = valor.replace(/\D/g, "")
    valor = valor.replace(/^(\d)/, "($1")
    valor = valor.replace(/(.{3})(\d)/, "$1)$2")
    if (valor.length == 9) {
      valor = valor.replace(/(.{1})$/, "-$1")
    } else if (valor.length == 10) {
      valor = valor.replace(/(.{2})$/, "-$1")
    } else if (valor.length == 11) {
      valor = valor.replace(/(.{3})$/, "-$1")
    } else if (valor.length == 12) {
      valor = valor.replace(/(.{4})$/, "-$1")
    } else if (valor.length > 12) {
      valor = valor.replace(/(.{4})$/, "-$1")
    }
    this.telefone = valor;
  }

  validarTel(valor) {
    valor = this.telefone;
    valor = valor.replace("(", "");
    valor = valor.replace(")", "");
    valor = valor.replace("-", "");
    // this.telefone = false;
  }

  salvar() {
    this.validacaoCtrl.validarEmail(this.email);
    this.validacaoCtrl.validarPassword(this.password);
    this.validacaoCtrl.validarNome(this.nome);
    this.validacaoCtrl.validarSobrenome(this.sobrenome);
    this.validacaoCtrl.validarTelefone(this.telefone);

    if (this.validacaoCtrl.erroEmail==true || this.validacaoCtrl.erroEmailConf==true || this.validacaoCtrl.erroSenha==true || this.validacaoCtrl.erroSenhaConf==true || this.validacaoCtrl.erroNome==true || this.validacaoCtrl.erroSobrenome==true || this.validacaoCtrl.erroTelefone==true) {
      this.geralCtrl.alertComum("Por favor, preencher os campos necessários.");
      return false;
    } 

    this.geralCtrl.alertComum("Dados corretos");
    this.usuario = 
    { 
      email: this.email, 
      password: this.password, 

      nome:this.nome, 
      sobrenome:this.sobrenome, 
      telefone:this.telefone,
      genero:this.genero, 
      nasc: this.nasc, 
      
      cep:this.cep, 
      endereco:this.endereco, 
      numero:this.numero, 
      complemento:this.complemento,
      bairro:this.bairro, 
      cidade:this.cidade,

      foto: this.cameractrl.photo
    };
    console.log(this.usuario);
  }

  // maskCPF(valor: string) {
  //   valor = valor.replace(/\D/g, "")
  //   valor = valor.replace(/(\d{3})(\d)/, "$1.$2")
  //   valor = valor.replace(/(\d{3})(\d)/, "$1.$2")
  //   valor = valor.replace(/(\d{3})(\d{1,2})$/, "$1-$2")
  //   this.cpf = valor
  // }

}
