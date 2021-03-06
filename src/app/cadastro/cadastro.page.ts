import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { BancoService } from '../service/banco.service';
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

  public logout: boolean = false;

  public email; emailConfir; password; passwordConfir: string="";

  public nome; sobrenome; genero="F"; nasc="2010/01/01"; telefone: string;

  public cep; endereco; numero; complemento; bairro; cidade: string;

  public erroEmail; erroEmailConf; erroSenha; erroSenhaConf; erroNome; erroSobrenome; erroTelefone: boolean = false;

  public userLocal: any;

  constructor(public bancoCtrl: BancoService, public geralCtrl: GeralService, public validacaoCtrl: ValidacaoService, public cameractrl: CameraService) { }

  ngOnInit() {
    this.carregarUser();
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
      this.geralCtrl.alertComum("Por favor, preencher os campos necess??rios.");
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

    if(this.logout == true) {
      this.inserirUser();
    } else {
      this.atualizarUsuario();
    }
  }

  // maskCPF(valor: string) {
  //   valor = valor.replace(/\D/g, "")
  //   valor = valor.replace(/(\d{3})(\d)/, "$1.$2")
  //   valor = valor.replace(/(\d{3})(\d)/, "$1.$2")
  //   valor = valor.replace(/(\d{3})(\d{1,2})$/, "$1-$2")
  //   this.cpf = valor
  // }

  inserirUser() {
    this.bancoCtrl.adicionarUsuario(this.usuario)
    .then((resposta: any) => { // caso de certo
      switch(resposta.Resp) {
        case '1':
          this.geralCtrl.alertComum("Email j?? cadastrado")
          break
        case '0':
          this.geralCtrl.alertComum("Usu??rio cadastrado com sucesso!")
          this.geralCtrl.carregarTela('login');
          break
      }
    })
    .catch((resposta) => {
      this.geralCtrl.alertComum("Servidor n??o encontrado")
    })
  }

  updateUser() {

  }

  carregarUser() {
    if(localStorage.getItem('user') == null || localStorage.getItem('user') == '') {
      this.logout = true;
    } else {
      this.logout = false;
      this.email = JSON.parse(localStorage.getItem('user')).email;
      this.emailConfir = JSON.parse(localStorage.getItem('user')).email;
      this.password = JSON.parse(localStorage.getItem('user')).senha;
      this.passwordConfir = JSON.parse(localStorage.getItem('user')).senha;
      this.nome = JSON.parse(localStorage.getItem('user')).nome;
      this.sobrenome = JSON.parse(localStorage.getItem('user')).sobrenome;
      this.telefone = JSON.parse(localStorage.getItem('user')).telefone;
      this.genero = JSON.parse(localStorage.getItem('user')).genero;
      this.nasc = JSON.parse(localStorage.getItem('user')).nasc;
      this.cep = JSON.parse(localStorage.getItem('user')).cep;
      this.numero = JSON.parse(localStorage.getItem('user')).numero;
      this.endereco = JSON.parse(localStorage.getItem('user')).endereco;
      this.complemento = JSON.parse(localStorage.getItem('user')).complemento;
      this.bairro = JSON.parse(localStorage.getItem('user')).bairro;
      this.cidade = JSON.parse(localStorage.getItem('user')).cidade;
      this.cameractrl.photoPadrao = 'http://localhost/organizze/imagens/'+JSON.parse(localStorage.getItem('user')).imagem+".jpg";
    }
  }

  atualizarUsuario(){
    this.usuario = {id_user:JSON.parse(localStorage.getItem('user')).id, email: this.email, senha: this.password, nome:this.nome, sobrenome:this.sobrenome, telefone:this.telefone,
      sexo:this.genero, nasc: this.nasc, cep:this.cep, endereco:this.endereco, numero:this.numero, complemento:this.complemento,
      bairro:this.bairro, cidade:this.cidade, foto:this.cameractrl.photo, nomefoto:JSON.parse(localStorage.getItem('user')).imagem};

      console.log(this.usuario)
      //Atualizar Usuario
      this.bancoCtrl.alterarUsuario(this.usuario)
      .then((resposta: any) => {
        switch (resposta.Resp) {
          //Atualiza????o
          case '1':
            this.userLocal= {id: resposta.id, 
              email: resposta.email, 
              senha: resposta.senha, 
              nome:resposta.nome, 
              sobrenome:resposta.sobrenome, 
              telefone:resposta.telefone, 
              sexo:resposta.sexo, 
              nasc:resposta.nasc, 
              cep:resposta.cep, 
              endereco:resposta.endereco, 
              numero:resposta.numero, 
              complemento:resposta.complemento, 
              bairro:resposta.bairro, 
              cidade:resposta.cidade, 
              imagem:resposta.imagem, 
              receita:resposta.receita
            };
            localStorage.setItem('user',  JSON.stringify(this.userLocal) );
            localStorage.setItem('total', resposta.receita);
            this.geralCtrl.alertComum('Usu??rio Atualizado');
            break;
        }
      })
      .catch((resposta) => {
        this.geralCtrl.alertComum('Servidor n??o encontrado. Tente mais tarde!')
      });
  }

}
