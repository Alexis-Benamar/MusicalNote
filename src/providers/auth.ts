import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthService {
	private user: firebase.User

	constructor(public afAuth: AngularFireAuth) {
		afAuth.authState.subscribe(user => {
			this.user = user
		});
	}

  get authenticated(): boolean {
    return this.user !== null
  }

  get verified(): boolean {
    return this.user.emailVerified
  }

  createUser(credentials) {
    return this.afAuth.auth.createUserWithEmailAndPassword(credentials.email, credentials.password)
  }

  getUser(): firebase.User {
    return this.user
  }

  sendEmailVerification() {
    return this.user.sendEmailVerification()
  }

	signInWithEmail(credentials) {
		return this.afAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.password)
  }

  signOut(): Promise<void> {
    return this.afAuth.auth.signOut()
  }


}
