import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, AlertController, LoadingController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';

import { HomePage } from '../home/home';
import { RegisterPage } from '../register/register';

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

    loginForm: FormGroup;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private formBuilder: FormBuilder,
        private menu: MenuController,
        private afAuth: AngularFireAuth,
        private alertCtrl: AlertController,
        private loadingCtrl: LoadingController,
    ) {
        this.loginForm = this.formBuilder.group({
            email: ['', Validators.compose([Validators.required, Validators.email, Validators.maxLength(50)])],
            password: ['', Validators.compose([Validators.required, Validators.maxLength(50)])],
        });
    }

    login() {
        if (this.loginForm.valid) {
            let loading = this.loadingCtrl.create({
                spinner: 'bubbles',
                content: 'Creating user...'
            });
            loading.present();

            this.afAuth.auth.signInWithEmailAndPassword(this.loginForm.value.email, this.loginForm.value.password)
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

    register() {
        this.navCtrl.push(RegisterPage);
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad LoginPage');
    }

    ionViewDidEnter() {
        this.menu.swipeEnable(false);
    }

    ionViewWillLeave() {
        this.loginForm.reset();
    }

}
