import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController,ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserPrd,SysUtil,IonicUtil,MsgPrd } from '../../../providers/providers';
import { AppConfig } from '../../../app/app.config';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  private signupErrorString: string;
  isEnabled:any =true;
  sendLabel:any="";
  mobile:any="";
  leafSecond:any=AppConfig.SendCheckCodeSec;

  signForm: FormGroup;

  constructor(public navCtrl: NavController,
    public viewCtrl: ViewController,
    public user: UserPrd,
    public toastCtrl: ToastController,
    public sysUtil:SysUtil,
    public ionicUtil:IonicUtil,
    public checkCode:MsgPrd,
    public translateService: TranslateService, 
    public formBuilder: FormBuilder) {

    this.signForm = formBuilder.group({
      mobile: ['', Validators.compose([Validators.required,Validators.pattern('[0-9]*'),Validators.minLength(11), Validators.maxLength(11)])],
      checkcode: ['', Validators.compose([Validators.required,Validators.maxLength(4),Validators.minLength(4)])],
      password: ['', Validators.compose([Validators.required,Validators.maxLength(12),Validators.minLength(6)])],
      passwordAg:['', Validators.compose([Validators.required])]
    });

    this.translateService.get('SIGNUP_ERROR').subscribe((value) => {
      this.signupErrorString = value;
    });
    
    this.enableCheck();
  }

  doSignup() {
    if(this.signForm.controls.password.value != this.signForm.controls.passwordAg.value){
      this.ionicUtil.toast("两次输入的密码不一致");
      return;
    }
    // Attempt to login in through our User service
    this.user.signup(this.signForm.value).then(resp => {
      if(resp.success){
        this.ionicUtil.toast("注册成功",3000);
        this.close();
        //this.navCtrl.push('LoginPage');
      }
    }).catch(err => {
      this.ionicUtil.toast(this.signupErrorString);
    });
  }

  close(){
    this.viewCtrl.dismiss();
  }

  sendCheckcode(){
    this.user.check(this.signForm.controls.mobile.value).then(resp=>{
      if(resp.success){
        this.checkCode.sendCheckCode(this.signForm.controls.mobile.value).then(resp=>{
          if(resp.success){
            this.isEnabled = false;
            setTimeout(() => {  
              this.mdLabel();  
            }, 1000); 
          }
        });
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
}
