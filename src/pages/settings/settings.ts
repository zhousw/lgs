import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, NavParams,ModalController,Events } from 'ionic-angular';

import { Settings,SysUtil } from '../../providers/providers';
import { User } from '../../providers/user/user';
import { UserInfo } from '../../models/userInfo';

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
  
  constructor(public navCtrl: NavController,
    public modalCtrl: ModalController,
    public settings: Settings,
    public formBuilder: FormBuilder,
    public navParams: NavParams,
    public translate: TranslateService,
    private userInfo:UserInfo,
    private sysUtil:SysUtil,
    public events: Events) {
      // events.subscribe('user:login', (user1) => { });
  }


  ionViewDidLoad() {
    // Build an empty form for the template to render
    // alert('ionViewDidLoad');
  }

  ionViewWillEnter() {
    // Build an empty form for the template to render
    //alert('ionViewWillEnter');
    this.sysUtil.checkLogin();
  }

  ionViewDidEnter(){
    // alert('ionViewDidEnter');
  }

  ionViewWillLeave(){
    // alert('ionViewWillLeave');
  }

  ionViewDidLeave(){
    // alert('ionViewDidLeave');
  }

  ionViewWillUnload(){
    // alert('ionViewWillUnload');
  }

  logOut() {
    this.userInfo._isLogin = false;
    //this.sysUtil.checkLogin();
  }

  goLogin() {
    this.sysUtil.checkLogin();
  }

}
