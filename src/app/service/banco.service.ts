import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BancoService {
  caminho: string = 'http://localhost/organizze/php/';
  // caminho: string = 'http://www.dominio.com.br/organizze/php/';

  constructor(public httpCtrl:HttpClient) { }

  // add usuário por email e senha
  adicionarUsuario(usuario: any) {
    let url = this.caminho + "addUser.php";
    let headers = new HttpHeaders ({'Content-Type': 'application/json'});
    return this.httpCtrl.post(url, usuario, {headers: headers}).toPromise();
  }

  logar() {
    let url = this.caminho + "autenticar.php";
  }
}
