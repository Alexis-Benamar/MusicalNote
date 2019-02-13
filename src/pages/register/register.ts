import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';

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
        public afAuth: AngularFireAuth) {

        this.registerForm = this.formBuilder.group({
            username: ['', Validators.required],
            email: ['', Validators.compose([Validators.required, Validators.email])],
            password: ['', Validators.compose([Validators.required, Validators.maxLength(50)])],
            confirmpwd: ['', Validators.compose([Validators.required, Validators.maxLength(50)])],
        });
    }

    async register() {
        if (this.registerForm.valid && this.registerForm.value.password === this.registerForm.value.confirmpwd) {
            console.log(this.registerForm.value);

            this.afAuth.auth.createUserAndRetrieveDataWithEmailAndPassword(this.registerForm.value.email, this.registerForm.value.password)
            .then(data => {
              console.log(data);
          }).catch(error => {
              console.error(error);
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
