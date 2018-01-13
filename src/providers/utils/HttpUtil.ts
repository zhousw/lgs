import { Http ,Headers ,RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import {AppConfig} from '../../app/app.config';
import {SysUtil} from './SysUtil';
import {IonicUtil} from './IonicUtil';
import * as $ from "jquery"; 
/**
 * Api is a generic REST Api handler. Set your API url first.
 */
@Injectable()
export class HttpUtil {
  baseUrl: string = AppConfig.BaseUrl;
  loadingImg:any;
  constructor(
    public  http: Http,
    private sysUtil : SysUtil,
    public ionicUtil:IonicUtil
  ) { }   

  private preReq(){
    this.loadingImg = this.ionicUtil.loading("加载中，请稍候...");
  }

  private afterResp(){
    this.loadingImg.dismiss();
  }
  get(url,header?:Headers){
    this.preReq();
    if(this.sysUtil.isNull(header)){
      header = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
    }
    if(!this.sysUtil.isNull(AppConfig.authorization)){
      header.append("authorization",AppConfig.authorization);
    }
    return this.http.get(this.baseUrl+url,new RequestOptions({headers: header})).toPromise()
        .then(res => this.handleSuccess(res.json()))
        .catch(error => this.handleError(error));
  }
  post(url,requestBody?,header?:Headers){
    this.preReq();
    if(this.sysUtil.isNull(header)){
      header = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
    }

    if(!this.sysUtil.isNull(AppConfig.authorization)){
      header.append("authorization",AppConfig.authorization);
    }
    
    return this.http.post(this.baseUrl+url,this.toBodyString(requestBody),new RequestOptions({headers: header}))
      .toPromise()
      .then(res => this.handleSuccess(res.json()))
      .catch(error => this.handleError(error));
    }

    private handleSuccess(result) {
      this.afterResp();
      if (result && !result.success) {
        this.ionicUtil.toast(result.msg);
      }
      return result;
    }

    private handleError(error: Response | any) {
      this.afterResp();
      let desc = '请求失败';
      if (error.status == 0) {
        desc = '请求地址错误';
      }
      if (error.status == 400) {
        desc = '请求无效';
        console.log('请检查参数类型是否匹配');
      }
      if (error.status == 404) {
        desc = '请求资源不存在';
        console.error(desc+'，请检查路径是否正确');
      }
      console.log(error);
      this.ionicUtil.toast(desc);   //应该由这里统一处理的·····现在的ctrl都处理了error
      return {success: false, msg: desc};
    }

     //http请求时对body数据的处理
     private  toBodyString(obj) {
      let ret = [];
      for (let key in obj) {
        key = encodeURIComponent($.trim(key));
        let values =$.trim(obj[key]);
        if (values && values.constructor == Array) {//数组
          let queryValues = [];
          for (let i = 0, len = values.length, value; i < len; i++) {
            value = values[i];
            queryValues.push(this.toQueryPair(key, value));
          }
          ret = ret.concat(queryValues);
        } else { //字符串
          ret.push(this.toQueryPair(key, values));
        }
      }
      return ret.join('&');
    }

    private  toQueryPair(key, value) {
      if (typeof value == 'undefined') {
        return key;
      }
      return key + '=' + encodeURIComponent(value === null ? '' : String(value));
    }
}
