import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { RecordsPage } from './records';

@NgModule({
  declarations: [
    RecordsPage,
  ],
  imports: [
    IonicPageModule.forChild(RecordsPage),
    TranslateModule.forChild()
  ],
})
export class RecordsPageModule {}
