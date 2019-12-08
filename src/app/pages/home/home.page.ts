import { Component } from '@angular/core';

import { AuthFirebaseService } from '../../services/firebase/auth-firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private authFirebaseService: AuthFirebaseService,
              private router: Router) {
                
    if(this.authFirebaseService.userDetails() === null) this.router.navigate(['/login']);

    console.log('user logged: ', this.authFirebaseService.userDetails())
  }

  ionViewWillEnter()
  {
    if(this.authFirebaseService.userDetails() === null) this.router.navigate(['/login']);
  }

}
