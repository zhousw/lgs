import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController,ViewController,Events } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserPrd, SysUtil } from '../../../providers/providers';
import { MainPage } from '../../pages';
import { AppConfig } from '../../../app/app.config';
import { IonicUtil } from '../../../providers/utils/IonicUtil';
import * as $ from 'jquery';
import * as md5 from 'md5';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: { mobile: string, password: string } = {
    mobile: '13868986074',
    password: ''
  };

  // Our translated text strings
  private loginErrorString: string;
  private loginForm:FormGroup;

  constructor(public navCtrl: NavController,
    public viewCtrl: ViewController,
    public user: UserPrd,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    private ionicUtil:IonicUtil,
    private sysUtil:SysUtil,
    public formBuilder:FormBuilder,
    public events: Events) {

    this.loginForm = formBuilder.group({
        mobile: ['', Validators.compose([Validators.required,Validators.pattern('[0-9]*'),Validators.minLength(11), Validators.maxLength(11)])],
        password: ['', Validators.compose([Validators.required,Validators.maxLength(12),Validators.minLength(6)])]
    });

    this.translateService.get('LOGIN_ERROR').subscribe((value) => {
      this.loginErrorString = value;
    });
  }

  // Attempt to login in through our User service
  doLogin() {
    //  this.events.publish('user:login',this.user);
    let mobile = $.trim(this.account.mobile);
    let password = $.trim(this.account.password);
    if( this.sysUtil.isNull(mobile)){
      this.ionicUtil.toast("请输入用户名！");
      return;
    }else if( this.sysUtil.isNull(password)){
      this.ionicUtil.toast("请输入密码");
      return;
    }
    this.user.login({'mobile':mobile,'password':md5(password)}).then(resp => {
      //this.navCtrl.push(MainPage);
      if(resp.success)
        this.viewCtrl.dismiss();
    });
  }

  register(){
    this.ionicUtil.modal('SignupPage');
  }

  forget(){
    this.navCtrl.push('ForgetPwdPage');
  }

  close(){
    this.viewCtrl.dismiss();
  }
}
