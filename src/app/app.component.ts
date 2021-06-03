import { Component } from '@angular/core';
import { GeralService } from './service/geral.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Fale Conosco', url: '/folder/Inbox', icon: 'mail' },
    { title: 'Tutoriais', url: '/folder/Outbox', icon: 'paper-plane' },
    { title: 'Redes Sociais', url: '/folder/Favorites', icon: 'heart' },
    { title: 'Contatos', url: '/folder/Archived', icon: 'archive' },
    { title: 'Perfil', url: '/cadastro', icon: 'person-circle' },
  ];
  constructor(public geralCTRL: GeralService) {
    if(localStorage.getItem('user') == null || localStorage.getItem('user') == '') {
      geralCTRL.carregarTela('folder/inbox');
    } else {
      geralCTRL.carregarTela('principal');
    }
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('total');

    this.geralCTRL.carregarTela('login');
  }
}
