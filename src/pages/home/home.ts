import { Component } from '@angular/core';
import { AuthService } from '../../providers/auth';
import { AngularFireDatabase } from '@angular/fire/database'
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
          handler: () => {
            if (song.key !== undefined) {
              this.db.database.ref(`songs/${ this.user.uid }`).child(song.key).remove()
            }
          }
        },
        {
          text: 'Save',
          handler: data => {
            if (song.key !== undefined) {
              this.db.database.ref(`songs/${ this.user.uid }/${ song.key }`).set({ key: song.key, ...data })
            } else {
              let newKey = this.db.database.ref(`songs/${ this.user.uid }`).push().key
              this.db.database.ref(`songs/${ this.user.uid }/${newKey}`).set({ key: newKey, ...data })
            }
          }
        }
      ]
    }).present()
  }

  loadSongs() {
    this.db.list(`songs/${ this.user.uid }`).valueChanges().subscribe(data => {
      this.songsList = [...data]
    })
  }
}
