import { Component, Inject } from '@angular/core';
import { GatewayComponent } from './Components/gateway/gateway.component';
import { GatewayDeviceService } from './Services/gateway-device.service';
<<<<<<< Updated upstream
// import {MatToolbarModule} from '@angular/material/toolbar';
// import {MatIconModule} from '@angular/material/icon';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';

=======
import{MatDialog,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from './Components/dialog/dialog.component';
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
  constructor(private _gatewayService: GatewayDeviceService, public dialog: MatDialog){}
=======

  ngOnInit(): void {
    this.openGatewayList();
    this.activeLink="http://localhost:4200/gateways";
    this.links[0]="http://localhost:4200/gateways";
    this.links[1]="http://localhost:4200/devices";
  }

  constructor(private _gatewayService: GatewayDeviceService, private dialog:MatDialog){}
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
  openDialog() {
    // this.dialog.open(DialogDataExampleDialog, {
    //   data: {
    //     animal: 'panda',
    //   },
    // });
  }

=======
  openGatewayList(){
    //this.openGatewayList.open(GatewayComponent);
  }
  openDialog(){
    this.dialog.open(DialogComponent,{
        width:'30%'      
    });
  }
>>>>>>> Stashed changes

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
