import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController,ViewController } from 'ionic-angular';

import { User } from '../../providers/providers';
import { AppConfig } from '../../app/app.config';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: { mobile: string, checkcode: string, password: string,passwordAg:string } = {
    mobile: '',
    checkcode: '',
    password: '',
    passwordAg:''
  };

  // Our translated text strings
  private signupErrorString: string;
  isEnabled:any =true;
  sendLabel:any="";
  leafSecond:any=AppConfig.SendCheckCodeSec;

  constructor(public navCtrl: NavController,
    public viewCtrl: ViewController,
    public user: User,
    public toastCtrl: ToastController,
    public translateService: TranslateService) {

    this.translateService.get('SIGNUP_ERROR').subscribe((value) => {
      this.signupErrorString = value;
    })

    this.enableCheck();
  }

  doSignup() {
    // Attempt to login in through our User service
    this.user.signup(this.account).then(resp => {
      this.navCtrl.push('MainPage');
    })
    .catch(err => {
      this.navCtrl.push('MainPage');

      // Unable to sign up
      let toast = this.toastCtrl.create({
        message: this.signupErrorString,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
  }

  close(){
    this.viewCtrl.dismiss();
  }

  sendCheckcode(){
    this.isEnabled = false;
    setTimeout(() => {  
      this.mdLabel();  
    }, 1000); 
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
    this.sendLabel = "获取验证码";
    this.isEnabled = true;
  }
}
