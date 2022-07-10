import { Component } from '@angular/core';
import { GatewayDeviceService } from './Services/gateway-device.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'DeviceGatewayUI';
  // listGatewayApp: any[]=[];
  // constructor(){}
  // constructor(private _gatewaysService: GatewayDeviceService){}
  // ListGatewayAPPMethod(){
  //   console.log('soy el padre');
  //   this._gatewaysService.getListGateways().subscribe(data=>{
  //     console.log(data);
  //     //this.listGatewayApp=data;  
  //   // },error=>{
  //   //   console.log(error);
  //   })

  // }
}
