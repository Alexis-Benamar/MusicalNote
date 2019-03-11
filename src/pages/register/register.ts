import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { HomePage } from '../home/home';
import { ToastProvider } from '../../providers/toast'
import { AuthService } from '../../providers/auth';

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
        private auth: AuthService,
        private toastProvider: ToastProvider) {

        this.registerForm = this.formBuilder.group({
            username: ['', Validators.required],
            email: ['', Validators.compose([Validators.required, Validators.email])],
            password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
            confirmpwd: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
        });
    }

    async register() {
        const { username, email, password, confirmpwd } = this

        if (this.registerForm.valid && password === confirmpwd) {
            try {
              const res = await this.auth.createUser({ email: email, password: password })
              res.user.updateProfile({ displayName: username, photoURL: '' })
              .then(() => this.navCtrl.setRoot(HomePage, {}, { animate: true, direction: 'forward' }))
            } catch(err) {
              this.toastProvider.toast(err.message)
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
