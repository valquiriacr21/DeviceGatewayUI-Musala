import { Component, Inject } from '@angular/core';
import { GatewayComponent } from './Components/gateway/gateway.component';
import { GatewayDeviceService } from './Services/gateway-device.service';
// import {MatToolbarModule} from '@angular/material/toolbar';
// import {MatIconModule} from '@angular/material/icon';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'DeviceGatewayUI';
  // listGatewayApp: any[]=[];
  listDevicesOfGatewaybySerialNumberFather: any;
  constructor(private _gatewayService: GatewayDeviceService, public dialog: MatDialog){}
  ShowGatewayWithYourDevices(parametros:any){
    console.log('soy el padre');
    console.log(parametros);

    this._gatewayService.getListDevicesOfGateway(parametros).subscribe(data=>{
      console.log(data);
      this.listDevicesOfGatewaybySerialNumberFather=data;  
    },error=>{
      console.log(error);
    })
  }
  openDialog() {
    // this.dialog.open(DialogDataExampleDialog, {
    //   data: {
    //     animal: 'panda',
    //   },
    // });
  }


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
// export class DialogDataExampleDialog {
//   constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}
// }
