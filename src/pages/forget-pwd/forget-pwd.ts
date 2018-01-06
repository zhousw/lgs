import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { AppConfig } from '../../app/app.config';
import { CheckCode, SysUtil,IonicUtil } from '../../providers/providers';
/**
 * Generated class for the ForgetPwdPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forget-pwd',
  templateUrl: 'forget-pwd.html',
})
export class ForgetPwdPage {

  account: { mobile: string, checkcode: string, password: string,passwordAg:string } = {
    mobile: '',
    checkcode: '',
    password: '',
    passwordAg:''
  };

  isEnabled:any =true;
  sendLabel:any="";
  leafSecond:any=AppConfig.SendCheckCodeSec;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public view:ViewController,
    public checkCode:CheckCode,
    public sysUtil:SysUtil,
    public ionicUtil:IonicUtil,
    public translateService: TranslateService) {
    this.enableCheck();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgetPwdPage');
  }

  sendCheckcode(){
    if(this.sysUtil.isNull(this.account.mobile)){
      this.ionicUtil.toast("手机号码不能为空！");
      return;
    }
    this.checkCode.sendCheckCode(this.account.mobile).then(resp=>{
      if(resp.success){
        this.isEnabled = false;
        setTimeout(() => {  
          this.mdLabel();  
        }, 1000); 
      }
    });
  }

  validCheckCode(){
    if(this.sysUtil.isNull(this.account.mobile)){
      this.ionicUtil.toast("手机号码不能为空！");
      return;
    }
    if(this.sysUtil.isNull(this.account.checkcode)){
      this.ionicUtil.toast("验证码不能为空！");
      return;
    }
    this.checkCode.validCheckCode(this.account.mobile,this.account.checkcode).then(resp=>{
      if(resp.success){
        this.view.dismiss();
        this.navCtrl.push('LoginPage');
      }
    });
  }

  mdLabel(){
    if(this.leafSecond > 0){
      setTimeout(() => {  
        this.mdLabel();  
      }, 1000); 
      this.sendLabel = (this.leafSecond--)+"s 后可重发";
    }else{
      this.enableCheck();
    }
  }
  enableCheck(){
    this.leafSecond = AppConfig.SendCheckCodeSec;
    this.translateService.get('SEND_CHECKCODE').subscribe((value) => {
      this.sendLabel = value;
    });
    this.isEnabled = true;
  }


  doNextStep(){
    this.validCheckCode();
  }

}
