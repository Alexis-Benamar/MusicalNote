import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';

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

    registerForm: FormGroup;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private formBuilder: FormBuilder,
        public afAuth: AngularFireAuth,
        public alertCtrl: AlertController,
        public loadingCtrl: LoadingController,) {

        this.registerForm = this.formBuilder.group({
            username: ['', Validators.required],
            email: ['', Validators.compose([Validators.required, Validators.email])],
            password: ['', Validators.compose([Validators.required, Validators.maxLength(50)])],
            confirmpwd: ['', Validators.compose([Validators.required, Validators.maxLength(50)])],
        });
    }

    register() {
        if (this.registerForm.valid && this.registerForm.value.password === this.registerForm.value.confirmpwd) {

            let loading = this.loadingCtrl.create({
                spinner: 'bubbles',
                content: 'Creating user...'
            });
            loading.present();

            this.afAuth.auth.createUserAndRetrieveDataWithEmailAndPassword(this.registerForm.value.email, this.registerForm.value.password)
            .then(data => {
                loading.dismiss();
                this.navCtrl.setRoot(HomePage, {animate: true, direction: 'forward'});
            }).catch(error => {
                loading.dismiss();

                this.alertCtrl.create({
                    title: 'Error',
                    message: 'There has been an error when logging in.'
                }).present();
            });
        }
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad RegisterPage');
    }

    ionViewWillLeave() {
        this.registerForm.reset();
    }

}
