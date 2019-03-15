import { Component } from '@angular/core';
import { IonicPage, NavController, MenuController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { HomePage } from '../home/home';
import { RegisterPage } from '../register/register';
import { NotifProvider } from '../../providers/notif'
import { AuthService } from '../../providers/auth';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

    loginForm: FormGroup
    email: string = ""
    password: string = ""

    constructor(
        public navCtrl: NavController,
        private formBuilder: FormBuilder,
        private menu: MenuController,
        private auth: AuthService,
        private notifProvider: NotifProvider,
    ) {
        this.loginForm = this.formBuilder.group({
            email: ['', Validators.compose([Validators.required, Validators.email, Validators.maxLength(50)])],
            password: ['', Validators.compose([Validators.required, Validators.maxLength(50)])],
        });
    }

    async login() {
      if (this.loginForm.valid) {
        const { email, password } = this

        this.auth.signInWithEmail({ email: email, password: password })
        .then(() => this.navCtrl.setRoot(HomePage, {}, { animate: true, direction: 'forward' }))
        .catch(err => {
          if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
            this.notifProvider.toast('Invalid email or password.')
          } else {
            // this.notifProvider.toast('Problem when logging in.')
            this.notifProvider.alert('error', err.message)
          }
        })
      }
    }

    register() {
        this.navCtrl.push(RegisterPage)
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad LoginPage')
    }

    ionViewDidEnter() {
        this.menu.swipeEnable(false)
    }

    ionViewWillLeave() {
        this.loginForm.reset()
    }

}
