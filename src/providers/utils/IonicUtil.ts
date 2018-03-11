import { AlertController,ToastController,ActionSheetController,ModalController,LoadingController  } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { SysUtil } from './SysUtil';

@Injectable()
export class IonicUtil{

     constructor(
        private  alertCtrl    : AlertController,
        private  toastCtrl    : ToastController,
        private  modalCtrl    : ModalController,
        public actionSheetCtrl:ActionSheetController,
        private  load      : LoadingController
    ){ }

    toast(msg,time?){
        this.toastCtrl.create({
            message : msg,
            position: 'top',
            duration: time || 1500
          }).present();
    };

    toastCenter(msg,time?){
        this.toastCtrl.create({
            message : msg,
            position: 'middle',
            duration: time || 1500
          }).present();
    };

    loading(msg){
        let loader = this.load.create({
            content: msg,
          });
          loader.present();
          return loader;
    }
    
    modal(template){
        this.modalCtrl.create(template).present();
    }

    showConfirm(title,msg,DisTxt,DisFn:Function,ATxt,AFn:Function) {    
        this.alertCtrl.create({
            title: title,
            message: msg,
            buttons: [
              {
                text: DisTxt,
                handler: () => {            
                    DisFn();
                }
              },
              {
                text: ATxt,
                handler: () => {            
                   AFn();
                }
              }
            ]
        }).present();
    }

    showPrompt(title,msg,inputName,inputPholder,defaultVal,success?:Function,cancel?:Function){
        this.alertCtrl.create({
            title: title,
            message: msg,
            inputs: [
              {
                name: inputName,
                value:defaultVal,
                placeholder: inputPholder
              },
            ],
            buttons: [
              {
                text: '取消',
                handler: data => {
                    if(cancel)
                        cancel(data);
                }
              },
              {
                text: '确定',
                handler: data => {
                    if(success)
                        success(data);
                }
              }
            ]
          }).present();
    }
    
    
}