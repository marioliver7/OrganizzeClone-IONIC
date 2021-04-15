import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
import { GeralService } from '../service/geral.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(public geralCtrl: GeralService) { }

  ngOnInit() {
  }
}
