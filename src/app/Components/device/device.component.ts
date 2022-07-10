import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GatewayDeviceService } from 'src/app/Services/gateway-device.service';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css']
})
export class DeviceComponent implements OnInit {

  listDevices:any[]=[];
  accion='Add';
  form:FormGroup;
  id:number|undefined; 
// constructor(){}
  constructor(private fb:FormBuilder, private _gatewayDeviceService:GatewayDeviceService) {
    this.form=this.fb.group({
      vendor:['',Validators.required],
      status:['',Validators.required],
      dateCreated:['',Validators.required],
      gatewaySerialNumber:['',Validators.required]
    })
   }

  ngOnInit(): void {
    this.getDevices();
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
      status:device.status,
      dateCreated:device.dateCreated,
      gatewaySerialNumber:device.gatewaySerialNumber      
    })  
    
  }


}
