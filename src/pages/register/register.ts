import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { Storage } from '@ionic/storage'

import { HomePage } from '../home/home';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

    registerForm: FormGroup
    username: string = ""
    email: string = ""
    password: string = ""
    confirmpwd: string = ""

    constructor(
        public navCtrl: NavController,
        private formBuilder: FormBuilder,
        private afAuth: AngularFireAuth,
        private storage: Storage) {

        this.registerForm = this.formBuilder.group({
            username: ['', Validators.required],
            email: ['', Validators.compose([Validators.required, Validators.email])],
            password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
            confirmpwd: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
        });
    }

    async register() {
        const { email, password, confirmpwd } = this
        if (this.registerForm.valid && password === confirmpwd) {
            try {
              const res = await this.afAuth.auth.createUserWithEmailAndPassword(email, password)
              this.storage.set('user', res.user.toJSON())
              .then(() => this.navCtrl.setRoot(HomePage, {animate: true, direction: 'forward'}))
            } catch(err) {
              console.log(err)
            }
        }
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad RegisterPage');
    }

    ionViewWillLeave() {
        this.registerForm.reset();
    }

}
