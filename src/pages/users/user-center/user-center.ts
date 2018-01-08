import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, NavParams,ViewController,ModalController,Events } from 'ionic-angular';

import { Settings,SysUtil } from '../../../providers/providers';
import { User } from '../../../providers/user/user';
import { UserInfo } from '../../../models/userInfo';

/**
 * Generated class for the UserCenterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-center',
  templateUrl: 'user-center.html',
})
export class UserCenterPage {

  constructor(public navCtrl: NavController,
    public modalCtrl: ModalController,
    public viewCtrl:ViewController,
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
    this.sysUtil.checkLogin();
  }


  logOut() {
    this.userInfo._isLogin = false;
    //this.sysUtil.checkLogin();
  }

  goLogin() {
    this.sysUtil.checkLogin();
  }

  goPage(pageN){
    if(this.sysUtil.checkLogin()){
      this.navCtrl.push(pageN);
    }
  }
  goPageNoLogin(pageN){
    this.navCtrl.push(pageN);
  }

}
