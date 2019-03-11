import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { AuthService } from '../../providers/auth';

import { ModalNewSongPage } from '../../pages/modal-new-song/modal-new-song'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  user: any

  constructor(
    private auth: AuthService,
    private modalCtrl: ModalController,
    ) {
    this.user = this.auth.getUser()
  }

  addSong() {
    this.modalCtrl.create(ModalNewSongPage).present()
  }

}
