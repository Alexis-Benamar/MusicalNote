import { Component } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-modal-new-song',
  templateUrl: 'modal-new-song.html',
})
export class ModalNewSongPage {

  constructor(public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalNewSongPage')
  }

  dismiss() {
    this.viewCtrl.dismiss()
  }

}
