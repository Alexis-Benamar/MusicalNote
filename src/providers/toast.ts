import { ToastController } from 'ionic-angular';
import { Injectable } from '@angular/core';

/*
  Generated class for the toastProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ToastProvider {

  constructor(public toastCtrl: ToastController) {
  }

  toast(message: string) {
    this.toastCtrl.create({
      message: message,
      duration: 3000
    }).present()
  }

}
