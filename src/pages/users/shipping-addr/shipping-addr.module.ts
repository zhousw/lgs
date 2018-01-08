import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShippingAddrPage } from './shipping-addr';

@NgModule({
  declarations: [
    ShippingAddrPage,
  ],
  imports: [
    IonicPageModule.forChild(ShippingAddrPage),
  ],
})
export class ShippingAddrPageModule {}
