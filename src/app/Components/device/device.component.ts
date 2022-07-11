import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GatewayDeviceService } from 'src/app/Services/gateway-device.service';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css']
})
export class DeviceComponent implements OnInit {
  StatusDeviceSelected:any;
  SerialGatewaySelected:any;
  listGateways:any[]=[];
  listDevices:any[]=[];
  accion='Add';
  form:FormGroup;
  id:number|undefined; 
  listStatus: any[]=[
    {value:'Offline',name:'Offline'},
    {value:'Online',name:'Online'},
   ];
// constructor(){}
  constructor(private fb:FormBuilder, private _gatewayDeviceService:GatewayDeviceService) {
    this.form=this.fb.group({
      vendor:['',Validators.required],
      status:['',Validators.required],
      // StatusDeviceSelected:['',Validators.required],
      dateCreated:['',Validators.required],
      gatewaySerialNumber:['',Validators.required]
    })
   }

  ngOnInit(): void {
    this.getDevices();
    this.getGateways();
    this.SerialGatewaySelected=this.listGateways[0];
    this.StatusDeviceSelected=this.listStatus[0].value;
  }

  // getGatewaySelected(){  
  //     this.GatewaySelected=this.listGateways[0];
  //   }
  getGateways(){
    this._gatewayDeviceService.getListGateways().subscribe(data=>{
      console.log(data);
      this.listGateways=data;
      // this.ListGatewayCapture=data;
    },error=>{
      console.log(error);
    })    
  }
  getDevices(){
    this._gatewayDeviceService.getListDevices().subscribe(data=>{
      console.log(data);
      this.listDevices=data;
    },error=>{
      console.log(error);
    })    
  }
  saveDevice(){
    const device:any={
      vendor:this.form.get('vendor')?.value,
      status:this.form.get('status')?.value,
      dateCreated:this.form.get('dateCreated')?.value,
      gatewaySerialNumber:this.form.get('gatewaySerialNumber')?.value
    }

    if(this.id==undefined){
      //Add new gateway
      this._gatewayDeviceService.saveDevice(device).subscribe(data=>{
        this.getDevices();
        this.form.reset();
      },error=>{
        console.log(error);
      })      
    }else{
      device.uid=this.id;
      //edit gateway
      this._gatewayDeviceService.updateDevice(this.id,device).subscribe(data=>{
        this.form.reset();
        this.accion="Add";
        this.id=undefined;
        this.getDevices();
      },error=>{
        console.log(error);
      });      
    }
  }

  deleteDevice(id:number){
    this._gatewayDeviceService.deleteDevice(id).subscribe(data=>{
      this.getDevices();
    },error=>{
      console.log(error);
    })
  }

  editDevice(device:any){
    this.accion='Edit';
    this.id=device.uid;
    this.form.patchValue({
      vendor:device.vendor,
      StatusDeviceSelected:device.status,
      dateCreated:device.dateCreated,
      SerialGatewaySelected:device.gatewaySerialNumber      
    })  
    
  }


}
