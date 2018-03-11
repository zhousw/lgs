import 'rxjs/add/operator/toPromise';

import { Headers ,RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';

import { HttpUtil } from './utils/HttpUtil';
import { UserInfo } from '../models/userInfo';
import { AppConfig } from '../app/app.config';
import { IonicUtil } from './utils/IonicUtil';

/**
 * Most apps have the concept of a User. This is a simple provider
 * with stubs for login/signup/etc.
 *
 * This User provider makes calls to our API at the `login` and `signup` endpoints.
 *
 * By default, it expects `login` and `signup` to return a JSON object of the shape:
 *
 * ```json
 * {
 *   status: 'success',
 *   user: {
 *     // User fields your app needs, like "id", "name", "email", etc.
 *   }
 * }Ø
 * ```
 *
 * If the `status` field is not `success`, then an error is detected and returned.
 */
@Injectable()
export class UserPrd {
  constructor(public httpUtil: HttpUtil,
          public userInfo:UserInfo,
          private ionicUtil:IonicUtil) { 
          }

  signup(accountInfo: any) {
    return this.httpUtil.post('user/register.do', accountInfo);
  }

  login(accountInfo: any) {
    return this.httpUtil.post('user/login.do', accountInfo).then(resp=>{
      if(resp.success){
        AppConfig.authorization = resp.attributes.authorization;
        this._loggedIn(resp.obj);
        this.ionicUtil.toast("登录成功");
      }else{
        this.logout();
      }
      return resp;
    });
  }

  _loggedIn(resp) {
    this.userInfo.id = resp.id;
    this.userInfo.mobile = resp.mobile;
    this.userInfo.userName = resp.userName;
    this.userInfo.name = resp.name;
    this.userInfo._isLogin = true;
  }

  modifyPwd(accountInfo: any) {
    return this.httpUtil.post('user/modifyPwd.do', accountInfo);
  }

  modifyUserInfo(accountInfo:any){
    return this.httpUtil.post('user/modifyUserInfo.do', accountInfo);
  }

  check(mobile:any){
    return this.httpUtil.get('user/checkUser.do?mobile='+mobile);
  }

  getUserByMobile(mobile:any){
    return this.httpUtil.post('user/getUserByMobile.do',{"mobile":mobile});
  }

  public isLogin(){
      return this.userInfo._isLogin;
  }

  public checkLogin(){
    if(!this.isLogin()){
        this.ionicUtil.modal('LoginPage');
        return false;
    }
    return true;
  }

  public logout(){
    this.userInfo.id = '';
    this.userInfo.mobile = '';
    this.userInfo.userName = '';
    this.userInfo.name = '';
    this.userInfo.sex = '';
    this.userInfo.sexName='';
    this.userInfo._isLogin = false;
  }

  public getUserInfo(){
    return this.userInfo;
  }
}
