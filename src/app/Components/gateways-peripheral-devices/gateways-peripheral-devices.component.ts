
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { ChildActivationStart } from '@angular/router';
import { GatewayDeviceService } from 'src/app/Services/gateway-device.service';

@Component({
  selector: 'app-gateways-peripheral-devices',
  templateUrl: './gateways-peripheral-devices.component.html',
  styleUrls: ['./gateways-peripheral-devices.component.css']
})
export class GatewaysPeripheralDevicesComponent implements OnInit {
  listDevicesOfGatewaybySerialNumber:any[]=[];
  GatewaySelected:any;
  accion='Add';
  form:FormGroup;
  id:number|undefined; 
  serialNumber:any;
  constructor(private fb:FormBuilder, private _gatewayDeviceService:GatewayDeviceService) {
    this.form=this.fb.group({
      serialNumber:['',Validators.required],
      name:['',Validators.required],
      ipV4:['',Validators.required],
      vendor:['',Validators.required],
      status:['',Validators.required],
      // StatusDeviceSelected:['',Validators.required],
      dateCreated:['',Validators.required]
        })
  }

  ngOnInit(): void {
  }

  saveDevice(){
    const device:any={
      serialNumber:this.form.get('serialNumber')?.value,
      vendor:this.form.get('vendor')?.value,
      status:this.form.get('status')?.value,
      dateCreated:this.form.get('dateCreated')?.value,
      gatewaySerialNumber:this.form.get('gatewaySerialNumber')?.value
    }

    // if(this.id==undefined){
    //   //Add new gateway
    //   this._gatewayDeviceService.saveDevice(device).subscribe(data=>{
    //     this.getListDevicesOfGateway(serialNumber);
    //     this.form.reset();
    //   },error=>{
    //     console.log(error);
    //   })      
    // }else{
    //   device.uid=this.id;
    //   //edit gateway
    //   this._gatewayDeviceService.updateDevice(this.id,device).subscribe(data=>{
    //     this.form.reset();
    //     this.accion="Add";
    //     this.id=undefined;
    //     this.getListDevicesOfGateway(serialNumber);
    //   },error=>{
    //     console.log(error);
    //   });      
    // }
  }
  getListDevicesOfGateway(serialNumber:number){
    this._gatewayDeviceService.getListDevicesOfGateway(serialNumber).subscribe(data=>{
      console.log(data);
      this.listDevicesOfGatewaybySerialNumber=data;
        // this.ListGatewayCapture=data;
      },error=>{
        console.log(error);
      })
    }

}
