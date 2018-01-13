import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { IonicUtil,UserPrd } from '../../../providers/providers';
import { AppConfig } from '../../../app/app.config';

/**
 * Generated class for the ModifyPwdPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modify-pwd',
  templateUrl: 'modify-pwd.html',
})
export class ModifyPwdPage {

  token:any;
  type:any;
  mobile:any;
  id:any;
  myForm:FormGroup;
  oldPassword:any="";
  isShowOldPwd:any = true;
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public formBuilder:FormBuilder,
     public ionicUtil:IonicUtil,
     public user:UserPrd,
     public viewCtrl:ViewController) {
       this.myForm = formBuilder.group({
        id:[''],
        oldPassword:['', Validators.compose([Validators.required,Validators.maxLength(12),Validators.minLength(6)])],
        password: ['', Validators.compose([Validators.required,Validators.maxLength(12),Validators.minLength(6)])],
        passwordAg:['', Validators.compose([Validators.required])]
      });
  }

  ionViewDidLoad() {
    this.type = this.navParams.get("type");
    if("forgetPwd" == this.type){
      this.token = this.navParams.get("token");
      this.mobile = this.navParams.get("mobile");
      this.isShowOldPwd = false;
      AppConfig.authorization = this.token;
      //this.myForm.get('oldPassword').setValidators([Validators.required,Validators.maxLength(12),Validators.minLength(6)]);
      //this.myForm.get('oldPassword').clearValidators();
      this.myForm = this.formBuilder.group({
        id:[''],
        oldPassword:[''],
        password: ['', Validators.compose([Validators.required,Validators.maxLength(12),Validators.minLength(6)])],
        passwordAg:['', Validators.compose([Validators.required])]
      });

      //根据mobile获取ID
      this.user.getUserByMobile(this.mobile).then(resp=>{
        if(resp.success){
          this.id = resp.obj.id;
        }
      });
    }else if("modifyPwd" == this.type){
      this.id = this.user.getUserInfo().id;
    }
    console.log('ionViewDidLoad ModifyPwdPage');
  }

  doModify(){
    if(this.myForm.controls.password.value != this.myForm.controls.passwordAg.value){
      this.ionicUtil.toast("两次输入的密码不一致");
      return;
    }

    this.user.modifyPwd(this.myForm.value).then(resp=>{
      if(resp.success){
        this.viewCtrl.dismiss();
        this.ionicUtil.toast(resp.msg);
      }
    });
  }

  close(){
    this.viewCtrl.dismiss();
  }

}
