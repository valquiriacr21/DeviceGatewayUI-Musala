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
  action='Add';
  form:FormGroup;
  id:number|undefined; 
  listStatus: any[]=[
    {value:'Offline',name:'Offline'},
    {value:'Online',name:'Online'},
   ];
  //  SerialGatewaySelected:any[]=[
  //   {serialNumber:'',name:'',ipV4:''},
  //  ];
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
    this.StatusDeviceSelected=this.listStatus[0].name;
    this.SerialGatewaySelected=this.listGateways[0].serialNumber;
    // this.SerialGatewaySelected.name=this.listGateways[0].name;
    // this.SerialGatewaySelected.ipV4=this.listGateways[0].ipV4;
    var a=0;
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
      dateCreated:this.form.get('dateCreated')?.value,
      status:this.form.get('status')?.value,
      gatewaySerialNumber:this.form.get('gatewaySerialNumber')?.value
    }

    if(this.id==undefined){
      //Add new gateway
      this._gatewayDeviceService.saveDevice(device).subscribe(data=>{
        this.getDevices();
        this.form.reset();
        this.StatusDeviceSelected=this.listStatus[0].name;
        this.SerialGatewaySelected=this.listGateways[0].serialNumber;
      },error=>{
        console.log(error);
      })      
    }else{
      device.uid=this.id;
      //edit gateway
      this._gatewayDeviceService.updateDevice(this.id,device).subscribe(data=>{
        this.form.reset();
        this.StatusDeviceSelected=this.listStatus[0].name;
        this.SerialGatewaySelected=this.listGateways[0].serialNumber;
        this.action="Add";
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
    this.action='Edit';
    this.id=device.uid;
    if(this.listStatus[0].value==device.status)
    {
      this.StatusDeviceSelected=this.listStatus[0].value;
    }
    else{
      this.StatusDeviceSelected=this.listStatus[1].value;
    }
    this.SerialGatewaySelected=device.gatewaySerialNumber;
    this.form.patchValue({
      vendor:device.vendor,
      dateCreated:device.dateCreated,
      StatusDeviceSelected:device.status.value,
      SerialGatewaySelected:device.gatewaySerialNumber     
    })  
    
  }


}
