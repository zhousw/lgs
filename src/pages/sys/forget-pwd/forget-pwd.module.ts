import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ForgetPwdPage } from './forget-pwd';
import { TranslateModule } from '@ngx-translate/core';
import { MsgPrd } from '../../../providers/providers';
@NgModule({
  declarations: [
    ForgetPwdPage,
  ],
  imports: [
    IonicPageModule.forChild(ForgetPwdPage),
    TranslateModule.forChild()
  ],
  providers:[
    MsgPrd
  ],
  exports: [
    ForgetPwdPage
  ]
})
export class ForgetPwdPageModule {}
