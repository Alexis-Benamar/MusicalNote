import { Component } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AngularFireDatabase } from '@angular/fire/database'

import { AuthService } from '../../providers/auth'
import { NotifProvider } from '../../providers/notif'

@IonicPage()
@Component({
  selector: 'page-modal-new-song',
  templateUrl: 'modal-new-song.html',
})
export class ModalNewSongPage {

  private user: any
  private newSongForm: FormGroup
  private title: string = ''
  private artist: string = ''
  private instrument: string = ''
  private link: string = ''

  constructor(
    private viewCtrl: ViewController,
    private formBuilder: FormBuilder,
    private db: AngularFireDatabase,
    private auth: AuthService,
    private notif: NotifProvider,
  ) {
    this.user = this.auth.getUser()
    this.newSongForm = this.formBuilder.group({
      title: ['', Validators.compose([Validators.required, Validators.maxLength(50)])],
      artist: ['', Validators.compose([Validators.required, Validators.maxLength(50)])],
      instrument: ['', Validators.compose([Validators.required, Validators.maxLength(255)])],
      link: ['', Validators.maxLength(255)],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalNewSongPage')
  }

  newSong() {
    const { title, artist, instrument, link } = this

    if (this.newSongForm.valid) {
      this.db.database.ref('songs/' + this.user.uid).push({
        title: title,
        artist: artist,
        instrument: instrument,
        link: link,
      })
      .then(() => {
        this.notif.toast('New song added!')
        this.dismiss()
      })
      .catch(err => this.notif.alert('Error', err.message))
    }
  }

  dismiss() {
    this.viewCtrl.dismiss()
  }

}
