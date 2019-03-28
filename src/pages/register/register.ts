import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { NotifProvider } from '../../providers/notif'
import { AuthService } from '../../providers/auth';
import { HomePage } from '../home/home';

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
    private notifProvider: NotifProvider,
  ) {
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
        //.then(() => res.user.sendEmailVerification())
        //.then(() => this.notifProvider.alert('Check your mailbox!', 'A verification email was sent.'))
        .then(() => this.navCtrl.setRoot(HomePage, {}, { animate: true, direction: 'forward'}))
        .catch(err => {
          this.notifProvider.alert('Error', err.message)
        })
      } catch(err) {
        this.notifProvider.alert('Error', err.message)
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
