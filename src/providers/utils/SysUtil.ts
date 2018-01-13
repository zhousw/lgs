import { AppConfig } from '../../app/app.config';
import * as angular from 'angular';
import { Injectable } from '@angular/core';

@Injectable()
export class SysUtil{

    constructor(
    ){}
    
      //判断是否为空
      public isNull (info){
          if(info == null || info == '' || angular.isUndefined(info)){
              return true;
          }else{
              return false;
          }
      };
      
      //日期格式化
      public dateFormat (dateObj,format){
          let o = {
              "M+" : dateObj.getMonth()+1, //month
              "d+" : dateObj.getDate(),    //day
              "h+" : dateObj.getHours(),   //hour
              "m+" : dateObj.getMinutes(), //minute
              "s+" : dateObj.getSeconds(), //second
              "q+" : Math.floor((dateObj.getMonth()+3)/3),  //quarter
              "S" : dateObj.getMilliseconds() //millisecond
          };
          if(/(y+)/.test(format)) format=format.replace(RegExp.$1,
              (dateObj.getFullYear()+"").substr(4 - RegExp.$1.length));
          for(let k in o)if(new RegExp("("+ k +")").test(format))
              format = format.replace(RegExp.$1,
                  RegExp.$1.length==1 ? o[k] :
                      ("00"+ o[k]).substr((""+ o[k]).length));
          return format;
      };
      
      //字符串替换
      public replaceAll (str,s1,s2){
          return str.replace(new RegExp(s1,"gm"),s2);
      }
      
      //日期格式化中文
      public dateFormatByChinese (dateStr){
          let res = '';
          if(!this.isNull(dateStr)){
             let days = ['星期天','星期一','星期二','星期三','星期四','星期五','星期六'];
             let date = new Date(dateStr);
             let week = days[date.getDay()];
             let	strs = dateStr.split(' ');
             let temps;
             if(strs.length > 1){
                  temps = strs[0].split('-');
                 res = temps[0] + '年' + temps[1] + '月' + temps[2] + '日 ' + week + ' ' + strs[1];
             }else{
                 temps = strs[0].split('-');
                 res = temps[0] + '年' + temps[1] + '月' + temps[2] + '日 ' + week;
             }
         }
          return res;
      };

      sleep(numberMillis) {
        let now = new Date();
        let exitTime = now.getTime() + numberMillis;
        while (true) {
          now = new Date();
          if (now.getTime() > exitTime)
            return;
        }
      }

      /**
       * 每500毫秒一次
       * @param time 
       */
     sleepTime(time:number){
        let timesRun = 0;
        let interval = setInterval(()=>{
            timesRun += 1;
        if(timesRun === time){
            clearInterval(interval);
        }
        }, 500);   
     }   
      
}