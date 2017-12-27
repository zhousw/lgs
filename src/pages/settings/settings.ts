import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, NavParams,ModalController,Events } from 'ionic-angular';

import { Settings } from '../../providers/providers';
import { WelcomePage } from '../../pages/welcome/welcome';
import { User } from '../../providers/user/user';

/**
 * The Settings page is a simple form that syncs with a Settings provider
 * to enable the user to customize settings for the app.
 *
 */
@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {
  isLogin:any;
  constructor(public navCtrl: NavController,
    public modalCtrl: ModalController,
    public settings: Settings,
    public formBuilder: FormBuilder,
    public navParams: NavParams,
    public translate: TranslateService,
    public user:User,
    public events: Events) {
      this.isLogin = user._isLogin;
      events.subscribe('user:login', (user1) => {
        this.isLogin = this.user._isLogin;
      });
  }


  ionViewDidLoad() {
    // Build an empty form for the template to render
    alert('ionViewDidLoad');
  }

  ionViewWillEnter() {
    // Build an empty form for the template to render
    alert('ionViewWillEnter');
  }

  ionViewDidEnter(){
    alert('ionViewDidEnter');
  }

  ionViewWillLeave(){
    alert('ionViewWillLeave');
  }

  ionViewDidLeave(){
    alert('ionViewDidLeave');
  }

  ionViewWillUnload(){
    alert('ionViewWillUnload');
  }

  logOut() {
    this.user._isLogin = false;
    this.isLogin = false;
    let modal = this.modalCtrl.create('LoginPage');
    modal.present();
  }
}
