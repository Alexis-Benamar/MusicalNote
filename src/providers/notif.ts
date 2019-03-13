import { AlertController, ToastController } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database'

/*
  Generated class for the toastProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NotifProvider {

  constructor(
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private db: AngularFireDatabase) {
  }

  toast(message: string) {
    this.toastCtrl.create({
      message: message,
      duration: 3000,
    }).present()
  }

  alert(title: string, subtitle: string) {
    this.alertCtrl.create({
      title: title,
      subTitle: subtitle,
      buttons: ['OK']
    }).present()
  }

}
