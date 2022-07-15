import { Component, Inject } from '@angular/core';
import { GatewayComponent } from './Components/gateway/gateway.component';
import { GatewayDeviceService } from './Services/gateway-device.service';
import{MatDialog,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from './Components/dialog/dialog.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'DeviceGatewayUI';
  // listGatewayApp: any[]=[];
  links:any[]=[];
  activeLink:any;
  background:any;
  listDevicesOfGatewaybySerialNumberFather: any;

  ngOnInit(): void {
    this.openGatewayList();
    this.activeLink="http://localhost:4200/gateways";
    this.links[0]="http://localhost:4200/gateways";
    this.links[1]="http://localhost:4200/devices";
  }

  constructor(private _gatewayService: GatewayDeviceService, private dialog:MatDialog){}
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
  openGatewayList(){
    //this.openGatewayList.open(GatewayComponent);
  }
  openDialog(){
    this.dialog.open(DialogComponent,{
        width:'30%'      
    });
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
