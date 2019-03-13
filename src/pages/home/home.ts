import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { AuthService } from '../../providers/auth';
import { AngularFireDatabase } from '@angular/fire/database'
import { ModalNewSongPage } from '../../pages/modal-new-song/modal-new-song'
import { AlertController } from 'ionic-angular'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  user: any
  songsList: any = []

  constructor(
    private auth: AuthService,
    private modalCtrl: ModalController,
    private db: AngularFireDatabase,
    private alertCtrl: AlertController,
  ) {
    this.user = this.auth.getUser()
  }

  addSong() {
    this.modalCtrl.create(ModalNewSongPage).present()
  }

  updateSong(song) {
    this.alertCtrl.create({
      title: 'Modify song',
      inputs: [
        { name: 'title', value: song.title },
        { name: 'artist', value: song.artist },
        { name: 'instrument', value: song.instrument },
        { name: 'link', value: song.link },
      ],
      buttons: [
        { text: 'Cancel', role: 'Cancel' },
        {
          text: 'Save',
          handler: data => {

            console.log(data)
            //this.db.database.ref(`songs/${ this.user.uid }`).set()
          }
        }
      ]
    }).present()
  }

  loadSongs() {
    this.db.database.ref(`songs/${ this.user.uid }`).on('value', snapshot => {
      snapshot.forEach(song => {
        this.songsList.push({
          key: song.key,
          ...song.val()
        })
      })
      console.log(this.songsList)
    })
  }

  ionViewWillLoad() {
    this.loadSongs()
  }
}
