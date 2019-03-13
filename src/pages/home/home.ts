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
    this.loadSongs()
  }

  updateSong(song) {
    this.alertCtrl.create({
      title: 'Modify song',
      inputs: [
        { name: 'title', placeholder: 'Title', value: song.title },
        { name: 'artist', placeholder: 'Artist', value: song.artist },
        { name: 'instrument', placeholder: 'Instrument', value: song.instrument },
        { name: 'link', placeholder: 'Link', value: song.link },
      ],
      buttons: [
        { text: 'Cancel', role: 'Cancel' },
        {
          text: 'Delete',
          handler: data => {
            if (song.key !== undefined) {
              this.db.database.ref(`songs/${ this.user.uid }`).child(song.key).remove()
            }
          }
        },
        {
          text: 'Save',
          handler: data => {
            if (song.key !== undefined) {
              this.db.database.ref(`songs/${ this.user.uid }/${ song.key }`).set(data)
            } else {
              this.db.database.ref(`songs/${ this.user.uid }`).push().set(data)
            }
          }
        }
      ]
    }).present()
  }

  loadSongs() {
    this.db.database.ref(`songs/${ this.user.uid }`).on('value', snapshot => {
      this.songsList = []
      snapshot.forEach(song => {
        this.songsList.push({
          key: song.key,
          ...song.val()
        })
      })
      console.log(this.songsList)
    })
  }
}
