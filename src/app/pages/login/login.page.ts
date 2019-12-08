import { Component, OnInit } from '@angular/core';

//Models
import { UserModel } from '../../models/user.model';

//SERVICE
import { AlertService } from '../../services/alert.service';
import { ProgressIndicatorService } from '../../services/progress-indicator.service';
import { AuthFirebaseService } from '../../services/firebase/auth-firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public user = new UserModel();

  public registerFlag: boolean = false;


  constructor(private authFirebaseService: AuthFirebaseService,
    private alertService: AlertService,
    private progressIndicatorService: ProgressIndicatorService,
    private router: Router) { }

  ngOnInit() {
  }

  activateRegister() {
    this.registerFlag = true;
  }

  cancel() {
    this.registerFlag = false;
  }

  async register() {

    const loading = await this.progressIndicatorService.createLoading();
    loading.present();

    this.authFirebaseService.register(this.user).then(() => {
      this.alertService.presentToast('Register done!!');
      this.registerFlag = false;
    }, error => {
      this.alertService.presentToast('There was a problem adding.....' + error);
    }).finally(() => {
      loading.dismiss();
    });
  }

  async login() {

    const loading = await this.progressIndicatorService.createLoading();
    loading.present();

    this.authFirebaseService.login(this.user).then(() => {
      this.alertService.presentToast('Register done!!');
      this.router.navigate(['/home']);
    }, error => {
      this.alertService.presentToast('There was a problem adding.....' + error);
    }).finally(() => {
      loading.dismiss();
    });
  }



}
