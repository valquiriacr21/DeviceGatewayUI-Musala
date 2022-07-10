import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { ChildActivationStart } from '@angular/router';
import { GatewayDeviceService } from 'src/app/Services/gateway-device.service';

@Component({
  selector: 'app-gateway',
  templateUrl: './gateway.component.html',
  styleUrls: ['./gateway.component.css']
})
export class GatewayComponent implements OnInit {
  // @Input() ListGatewayCaptures:any[]=[];
  listDevicesOfGatewaybySerialNumber:any[]=[];
  GatewaySelected:any;
  listGateway:any[]=[];
  accion='Add';
  form:FormGroup;
  id:number|undefined; 
  //DisplayState: 'none';
  // constructor(){}
  constructor(private fb:FormBuilder, private _gatewayDeviceService:GatewayDeviceService) {
    this.form=this.fb.group({
      // serialNumber:['',Validators.required],
      name:['',Validators.required],
      ipV4:['',Validators.required]
    })
  }

  ngOnInit(): void {
    this.getGateways();
  }

  getGateways(){
    this._gatewayDeviceService.getListGateways().subscribe(data=>{
      console.log(data);
      this.listGateway=data;
      // this.ListGatewayCapture=data;
    },error=>{
      console.log(error);
    })    
  }

  saveGateway(){
    const gateway:any={
      name:this.form.get('name')?.value,
      ipV4:this.form.get('ipV4')?.value
    }

    if(this.id==undefined){
      //Add new gateway
      this._gatewayDeviceService.saveGateway(gateway).subscribe(data=>{
        this.getGateways();
        this.form.reset();
      },error=>{
        console.log(error);
      })      
    }else{
      gateway.serialNumber=this.id;
      //edit gateway
      this._gatewayDeviceService.updateGateway(this.id,gateway).subscribe(data=>{
        this.form.reset();
        this.accion="Add";
        this.id=undefined;
        this.getGateways();
      },error=>{
        console.log(error);
      });      
    }
  }

  deleteGateway(id:number){
    this._gatewayDeviceService.deleteGateway(id).subscribe(data=>{
      this.getGateways();
    },error=>{
      console.log(error);
    })
  }

  editGateway(gateway:any){
    this.accion='Edit';
    this.id=gateway.serialNumber;
    this.form.patchValue({
      ipV4:gateway.ipV4,
      name:gateway.name,      
    })      
  }
  getGatewaySelected(serialNumber:number){
    this._gatewayDeviceService.getGateway(serialNumber).subscribe(data=>{
      console.log(data);
      this.GatewaySelected=data;
        // this.ListGatewayCapture=data;
      },error=>{
        console.log(error);
      })    
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

  



