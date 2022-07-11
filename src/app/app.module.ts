import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {HttpClientModule} from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DeviceComponent } from './Components/device/device.component';
import { GatewayComponent } from './Components/gateway/gateway.component';
import { GatewaysPeripheralDevicesComponent } from './Components/gateways-peripheral-devices/gateways-peripheral-devices.component';

@NgModule({
  declarations: [
    AppComponent,
    DeviceComponent,
    GatewayComponent,
    GatewaysPeripheralDevicesComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
