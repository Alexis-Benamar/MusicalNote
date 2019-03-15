import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { AuthService } from '../../providers/auth'

/**
 * Generated class for the AccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {

  user: any

  constructor(private auth: AuthService) {
    this.user = this.auth.getUser()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountPage');
  }

}
