import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SysUtil, UserPrd } from '../../../providers/providers';
import { UserInfo } from '../../../models/userInfo';

/**
 * Generated class for the UserInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-info',
  templateUrl: 'user-info.html',
})
export class UserInfoPage {

  constructor(public navCtrl: NavController, 
            public navParams: NavParams,
            private userInfo:UserInfo,
            public userPrd:UserPrd,
            public sysUtil:SysUtil) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserInfoPage');
  }

  goPage(pageN){
    if(this.userPrd.checkLogin()){
      this.navCtrl.push(pageN);
    }
  }

  modifyPwd(){
    if(this.userPrd.checkLogin()){
      this.navCtrl.push("ModifyPwdPage",{"type":"modifyPwd"});
    }
  }
}
