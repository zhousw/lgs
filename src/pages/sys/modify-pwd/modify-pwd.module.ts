import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModifyPwdPage } from './modify-pwd';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ModifyPwdPage,
  ],
  imports: [
    IonicPageModule.forChild(ModifyPwdPage),
    TranslateModule.forChild()
  ],
})
export class ModifyPwdPageModule {}
