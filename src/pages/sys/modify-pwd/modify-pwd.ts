import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { IonicUtil } from '../../../providers/providers';

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

  myForm:FormGroup;
  oldPassword:any="";
  isShowOldPwd:any = true;
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public formBuilder:FormBuilder,
     public ionicUtil:IonicUtil,
     public viewCtrl:ViewController) {
       this.myForm = formBuilder.group({
        oldPassword:['', Validators.compose([Validators.required,Validators.maxLength(12),Validators.minLength(6)])],
        password: ['', Validators.compose([Validators.required,Validators.maxLength(12),Validators.minLength(6)])],
        passwordAg:['', Validators.compose([Validators.required])]
      });
  }

  ionViewDidLoad() {
    var type = this.navParams.get("type");
    if("forgetPwd" == type){
      this.isShowOldPwd = false;
      //this.myForm.get('oldPassword').setValidators([Validators.required,Validators.maxLength(12),Validators.minLength(6)]);
      //this.myForm.get('oldPassword').clearValidators();
      this.myForm = this.formBuilder.group({
        oldPassword:[''],
        password: ['', Validators.compose([Validators.required,Validators.maxLength(12),Validators.minLength(6)])],
        passwordAg:['', Validators.compose([Validators.required])]
      });
    }
    console.log('ionViewDidLoad ModifyPwdPage');
  }

  doModify(){
    if(this.myForm.controls.password.value != this.myForm.controls.passwordAg.value){
      this.ionicUtil.toast("两次输入的密码不一致");
      return;
    }
    this.viewCtrl.dismiss();
  }

  close(){
    this.viewCtrl.dismiss();
  }

}
