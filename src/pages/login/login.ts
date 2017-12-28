import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController,ViewController,Events } from 'ionic-angular';

import { User } from '../../providers/providers';
import { MainPage } from '../pages';
import { UserInfo } from '../../models/userInfo';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: { mobile: string, password: string } = {
    mobile: '13868986074',
    password: 'test'
  };

  // Our translated text strings
  private loginErrorString: string;

  constructor(public navCtrl: NavController,
    public viewCtrl: ViewController,
    public user: User,
    public userInfo:UserInfo,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    public events: Events) {

    this.translateService.get('LOGIN_ERROR').subscribe((value) => {
      this.loginErrorString = value;
    })
  }

  // Attempt to login in through our User service
  doLogin() {
    this.userInfo._isLogin = true;
  //  this.events.publish('user:login',this.user);

    this.user.login(this.account).subscribe((resp) => {
      //this.navCtrl.push(MainPage);
      this.viewCtrl.dismiss();
    }, (err) => {
      //this.navCtrl.push(MainPage);
      this.viewCtrl.dismiss();
      // Unable to log in
      let toast = this.toastCtrl.create({
        message: this.loginErrorString,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
  }
}
