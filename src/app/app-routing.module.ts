import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeviceComponent } from './Components/device/device.component';
import { GatewayComponent } from './Components/gateway/gateway.component';
import { GatewaysPeripheralDevicesComponent } from './Components/gateways-peripheral-devices/gateways-peripheral-devices.component';

const routes: Routes = [
  {path:"gateways",component:GatewayComponent},
  {path:"devices",component:DeviceComponent},
  {path:"gatewaysPeripheralDevices",component:GatewaysPeripheralDevicesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
