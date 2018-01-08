import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShippingAddrListPage } from './shipping-addr-list';

@NgModule({
  declarations: [
    ShippingAddrListPage,
  ],
  imports: [
    IonicPageModule.forChild(ShippingAddrListPage),
  ],
})
export class ShippingAddrListPageModule {}
