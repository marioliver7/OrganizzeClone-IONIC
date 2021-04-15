import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class GeralService {

  constructor(public navCtrl: NavController, public alertController: AlertController, public http:HttpClient) { }

  async alertInicial(msn) {
    const alert = await this.alertController.create({
      header: 'Organizze',
      message: 'Deseja realmente sair dessa tela?',
      buttons: [
        {
          text: 'Sim',
          cssClass: 'secondary',
          handler: () => {
            this.navCtrl.navigateForward("folder/Index")
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

  carregarTela(page) {
    this.navCtrl.navigateForward(page);
  }


  carregarCep(cep) {
    let url = 'http://viacep.com.br/ws/' + cep + '/json/';
    let headers = new HttpHeaders ({ 'content-Type' : 'application/json' });

    return this.http.get(url).toPromise();
  }
}
