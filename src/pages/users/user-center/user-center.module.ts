import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserCenterPage } from './user-center';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    UserCenterPage,
  ],
  imports: [
    IonicPageModule.forChild(UserCenterPage),
    TranslateModule.forChild()
  ],
})
export class UserCenterPageModule {}
