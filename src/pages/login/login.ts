import { Component } from '@angular/core';
import { IonicPage, NavController, MenuController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { Storage } from '@ionic/storage'

import { HomePage } from '../home/home';
import { RegisterPage } from '../register/register';
import { ToastProvider } from '../../providers/toast/toast'

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
        private afAuth: AngularFireAuth,
        private storage: Storage,
        private toastProvider: ToastProvider,
    ) {
        this.loginForm = this.formBuilder.group({
            email: ['', Validators.compose([Validators.required, Validators.email, Validators.maxLength(50)])],
            password: ['', Validators.compose([Validators.required, Validators.maxLength(50)])],
        });
    }

    async login() {
      if (this.loginForm.valid) {
        const { email, password } = this
        try {
          const res = await this.afAuth.auth.signInWithEmailAndPassword(email, password)
          this.storage.set('user', res.user.toJSON())
          .then(() => this.navCtrl.setRoot(HomePage, {}, { animate: true, direction: 'forward' }))
        } catch(err) {
          if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
            this.toastProvider.toast('Invalid email or password.')
          } else {
            this.toastProvider.toast('Problem when logging in.')
          }
        }
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
