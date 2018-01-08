import 'rxjs/add/operator/toPromise';

import { Injectable } from '@angular/core';

import { HttpUtil } from '../utils/HttpUtil';
import { UserInfo } from '../../models/userInfo';
import { AppConfig } from '../../app/app.config';
import { IonicUtil } from '../utils/IonicUtil';

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
export class User {
  constructor(public httpUtil: HttpUtil,
          public userInfo:UserInfo,
          private ionicUtil:IonicUtil) { 

          }

  /**
   * Send a POST request to our login endpoint with the data
   * the user entered on the form.
   */
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

  /**
   * Send a POST request to our signup endpoint with the data
   * the user entered on the form.
   */
  signup(accountInfo: any) {
    return this.httpUtil.post('user/register.do', accountInfo).then(res => {
      // If the API returned a successful response, mark the user as logged in
      if (res.success) {
        //this._loggedIn(res);
      }
      return res;
    });
  }

  /**
   * Log the user out, which forgets the session
   */
  logout() {
    this.userInfo._isLogin = false;
  }

  /**
   * Process a login/signup response to store user data
   */
  _loggedIn(resp) {
    this.userInfo.id = resp.id;
    this.userInfo.mobile = resp.mobile;
    this.userInfo.userName = resp.userName;
    this.userInfo.name = resp.name;
    this.userInfo._isLogin = true;
  }
}
