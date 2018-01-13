import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { MsgPrd } from '../../../providers/providers';

import { SignupPage } from './signup';

@NgModule({
  declarations: [
    SignupPage,
  ],
  imports: [
    IonicPageModule.forChild(SignupPage),
    TranslateModule.forChild()
  ],
  providers:[
    MsgPrd
  ],
  exports: [
    SignupPage
  ]
})
export class SignupPageModule { }
