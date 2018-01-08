import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ForgetPwdPage } from './forget-pwd';
import { TranslateModule } from '@ngx-translate/core';
import { CheckCode } from '../../../providers/providers';
@NgModule({
  declarations: [
    ForgetPwdPage,
  ],
  imports: [
    IonicPageModule.forChild(ForgetPwdPage),
    TranslateModule.forChild()
  ],
  providers:[
    CheckCode
  ],
  exports: [
    ForgetPwdPage
  ]
})
export class ForgetPwdPageModule {}
