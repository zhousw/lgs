import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, NavParams,ViewController,ModalController,Events } from 'ionic-angular';

import { SettingsPrd,SysUtil,UserPrd } from '../../../providers/providers';
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
    public formBuilder: FormBuilder,
    public navParams: NavParams,
    public translate: TranslateService,
    private userPrd:UserPrd,
    private userInfo:UserInfo,
    private sysUtil:SysUtil,
    public events: Events) {
      // events.subscribe('user:login', (user1) => { });
  }

  ionViewDidLoad() {
    this.userPrd.checkLogin();
  }


  logOut() {
    this.userPrd.logout();
  }

  goLogin() {
    this.userPrd.checkLogin();
  }

  goPage(pageN){
    if(this.userPrd.checkLogin()){
      this.navCtrl.push(pageN);
    }
  }
  goPageNoLogin(pageN){
    this.navCtrl.push(pageN);
  }

}
