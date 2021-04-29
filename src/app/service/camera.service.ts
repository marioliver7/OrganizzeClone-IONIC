import { Injectable } from '@angular/core';
import { Plugins, CameraResultType } from '@capacitor/core';
// import { Base64 } from '@ionic-native/base64/ngx';

const { Camera } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class CameraService {
  photoPadrao: any="assets/img/user.png";
  photo: any="";

  constructor() { }

  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Base64,
      saveToGallery: true,
      width: 500,
      height: 500,
    });

    this.photo = `data:image/jpeg;base64,${image.base64String}`;
    this.photoPadrao = this.photo;
  }

}
