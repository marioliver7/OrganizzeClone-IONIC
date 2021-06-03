import { Component, OnInit } from '@angular/core';
import { BancoService } from '../service/banco.service';
// import { ActivatedRoute } from '@angular/router';
import { GeralService } from '../service/geral.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public email; senha: string;
  public userLocal: any;

  constructor(public geralCtrl: GeralService, public banco: BancoService) { }

  ngOnInit() {
  }

  login() {
    if(this.email == undefined || this.email == '' || this.senha == undefined || this.senha == '') {
      this.geralCtrl.alertComum('Por favor, preencha os campos necessários.');
    } else {
      let autenticacao = {email: this.email, senha: this.senha}
      this.banco.logar(autenticacao)
      .then((resposta: any) => {

        switch(resposta.Resp) {
          case '0': 
            this.geralCtrl.alertComum('Usuário ou senha inválidos!');
            this.email = '';
            this.senha = '';
            break
          
          case '1':
            this.userLocal = {
              id: resposta.id,
              email: resposta.email,
              senha: resposta.senha,
              nome: resposta.nome,
              sobrenome: resposta.sobrenome,
              telefone: resposta.telefone,
              sexo: resposta.sexo,
              nasc: resposta.nasc,
              cep: resposta.cep,
              endereco: resposta.endereco,
              numero: resposta.numero,
              complemento: resposta.complemento,
              bairro: resposta.bairro,
              cidade: resposta.cidade,
              imagem: resposta.imagem,
              receita: resposta.receita,
            }
            localStorage.setItem('user', JSON.stringify(this.userLocal));
            localStorage.setItem('total', resposta.receita);
            this.email = '';
            this.senha = '';
            this.geralCtrl.carregarTela('principal');
            break;
        }
      })
      .catch((resposta) => {
        this.geralCtrl.alertComum('Servidor não encontrado. Tente mais tarde!');
      })
    }
  }
}
