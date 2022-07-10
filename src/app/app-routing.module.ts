import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeviceComponent } from './Components/device/device.component';
import { GatewayComponent } from './Components/gateway/gateway.component';

const routes: Routes = [
  {path:"gateway",component:GatewayComponent},
  {path:"device",component:DeviceComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
