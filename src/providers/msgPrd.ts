import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HttpUtil } from './utils/HttpUtil';
import { IonicUtil } from './utils/IonicUtil';
/**
 * A simple settings/config class for storing key/value pairs with persistence.
 */
@Injectable()
export class MsgPrd {

  constructor(public storage: Storage,
    public httpUtil:HttpUtil, 
    public ionicUtil:IonicUtil) {

  }

  sendCheckCode(mobile){
    return this.httpUtil.post('msg/sendCheckCode.do', {"mobile":mobile}).then(resp=>{
        if(resp.success)
            this.ionicUtil.toast(resp.msg);
        return resp;
      });
  }

  validCheckCode(mobile,checkCode){
    return this.httpUtil.post('msg/validCheckCode.do', {"mobile":mobile,"checkCode":checkCode});
  }

}
