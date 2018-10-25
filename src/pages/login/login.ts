import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

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
        private menu: MenuController
    ) {
        this.loginForm = this.formBuilder.group({
            email: ['', Validators.compose([Validators.required, Validators.email, Validators.maxLength(50)])],
            password: ['', Validators.compose([Validators.required, Validators.maxLength(50)])],
        });
    }

    login() {
        if (this.loginForm.valid) {
            console.log(this.loginForm.value);
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
