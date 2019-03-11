import { Component } from '@angular/core';
import { AuthService } from '../../providers/auth';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  user: any

  constructor(private auth: AuthService) {
    this.user = this.auth.getUser()
  }

}
