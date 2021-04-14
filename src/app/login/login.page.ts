import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(public navCTRL: NavController) { }

  ngOnInit() {
  }

  carregarTela(tela) {
    this.navCTRL.navigateForward(tela);
  }

}
