import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  public erroEmail; erroEmailConfig; erroSenha; erroSenhaConfig; erroNome; erroSobrenome; erroTelefone: boolean = false;

  constructor(public alertController: AlertController, public navCtrl: NavController) { }

  ngOnInit() {
  }

  teste() {
    alert("Bom dia");
  }

  async alertaSimples() {
    const alert = await this.alertController.create({
      header: 'Organizze',
      subHeader: 'SubTítulo',
      message: 'Boa noite!',
      buttons: ['Ok']
    });
    await alert.present();
  }

  async sairTela() {
    const alert = await this.alertController.create({
      header: 'Organizze',
      message: 'Deseja realmente sair dessa tela?',
      buttons: [
        {
          text: 'Sim',
          cssClass: 'secondary',
          handler: () => {
            this.navCtrl.navigateForward("folder/inbox")
          }
        }, 
        {
          text: 'Não',
          role: 'não',
          handler: () => {
            
          }
        }
      ]
    });

    await alert.present();
  }

}
