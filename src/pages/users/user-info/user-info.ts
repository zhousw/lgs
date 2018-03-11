import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ActionSheetController } from 'ionic-angular';
import { SysUtil, UserPrd,IonicUtil,DictDataPrd } from '../../../providers/providers';
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
            public actionSheetCtrl:ActionSheetController,
            public ionicUtil:IonicUtil,
            public dictDataPrd:DictDataPrd,
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

  setSex(){
    let actionSheet = this.actionSheetCtrl.create({
      title: '选择性别',
      buttons: [
        {
          text: '男',
          handler: () => {
            this.userInfo.sexName="男";
            this.userInfo.sex = "1";
            this.modifySex();
          }
        },{
          text: '女',
          handler: () => {
            this.userInfo.sexName="女";
            this.userInfo.sex = "2";
            this.modifySex();
          }
        },{
          text: '关闭',
          handler: () => {
          }
        }
      ]
    });
    actionSheet.present();
  }

  modifySex(){
    this.userPrd.modifyUserInfo({"id":this.userInfo.id,"sex":this.userInfo.sex});
  }

  setEmail(){
    this.ionicUtil.showPrompt('邮箱地址','','email','邮箱地址',this.userInfo.email,data=>{
      this.userInfo.email = data.email;
    });
  }

  setName(){
    this.ionicUtil.showPrompt('姓名','','name','姓名',this.userInfo.name,data=>{
      this.userInfo.name = data.name;
    });
  }
}
