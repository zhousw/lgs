import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppConfig } from '../../../app/app.config';
import { MsgPrd, SysUtil,IonicUtil } from '../../../providers/providers';

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

  token:any;
  isEnabled:any =true;
  sendLabel:any="";
  leafSecond:any=AppConfig.SendCheckCodeSec;
  myForm:FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public view:ViewController,
    public checkCode:MsgPrd,
    public formBuilder:FormBuilder,
    public sysUtil:SysUtil,
    public ionicUtil:IonicUtil,
    public translateService: TranslateService) {

    this.myForm = formBuilder.group({
      mobile: ['', Validators.compose([Validators.required,Validators.pattern('[0-9]*'),Validators.minLength(11), Validators.maxLength(11)])],
      checkcode: ['', Validators.compose([Validators.required,Validators.maxLength(4),Validators.minLength(4)])]
    });
    this.enableCheck();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgetPwdPage');
  }

  sendCheckcode(){
    this.checkCode.sendCheckCode(this.account.mobile).then(resp=>{
      if(resp.success){
        this.token = resp.obj;
        this.isEnabled = false;
        setTimeout(() => {  
          this.mdLabel();  
        }, 1000); 
      }
    });
  }

  validCheckCode(){
    this.checkCode.validCheckCode(this.account.mobile,this.account.checkcode).then(resp=>{
      if(resp.success){
        this.view.dismiss();
        this.navCtrl.push('ModifyPwdPage',{"type":"forgetPwd","token":this.token,"mobile":this.account.mobile});
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
