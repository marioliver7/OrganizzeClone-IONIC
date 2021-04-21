import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { GeralService } from '../service/geral.service';
import { ValidacaoService } from '../service/validacao.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  public email; password: string="";

  public cep; endereco; numero; complemento; bairro; cidade: string;

  constructor(public geralCtrl: GeralService, public validacaoCtrl: ValidacaoService) { }

  ngOnInit() {
  }

  exibirCep(cep) {
    this.geralCtrl.carregarCep(cep)
    .then ((response:any) => {
      // this.complemento = response.complemento;
      this.endereco = response.logradouro;
      this.bairro = response.bairro;
      this.cidade = response.localidade;
    })
    .catch ((response:any) => {
      alert("CEP incorreto")
    })
  }

}
