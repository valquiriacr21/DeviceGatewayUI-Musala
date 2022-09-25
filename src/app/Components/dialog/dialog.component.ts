import { Component, OnInit, Input,Output } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { GatewayDeviceService } from 'src/app/Services/gateway-device.service';
// import { GatewayComponent } from 'src/app/Components/gateway/gateway.component';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})

export class DialogComponent implements OnInit 
{
  action='Add';
  titleOfComponent:any;
  form:FormGroup;
  id:number|undefined; 
   @Input() listGateways:any[]=[];
  
  constructor(private fb:FormBuilder, 
            private _gatewayDeviceService:GatewayDeviceService, 
            private dialogRef : MatDialogRef<DialogComponent>) 
  {
    this.titleOfComponent="Gateway";
    this.action="Add";
    this.form=this.fb.group({
      serialNumber:['',Validators.required],
      name:['',Validators.required],
      ipV4:['',Validators.required]
    })
   }

  ngOnInit(): void {
    this.titleOfComponent="Gateway";
    this.action="Add";
  }

  getGateways(){
    this._gatewayDeviceService.getListGateways().subscribe(data=>{
      console.log(data);
      this.listGateways=data;
      
      // this.ListGatewayCapture=data;
    },error=>{
      console.log(error);
    })    
  }
  addGateway(){
    console.log(this.form.value);
    const gateway:any={
      serialNumber:this.form.get('serialNumber')?.value,
      name:this.form.get('name')?.value,
      ipV4:this.form.get('ipV4')?.value
    }

    // if(this.id==undefined){
    //   //Add new gateway
    // if(this.form.valid){
      
       this._gatewayDeviceService.saveGateway(gateway).subscribe(data=>{
        this.getGateways();
        alert("Gateway Added succesfully");
        this.form.reset();
        this.dialogRef.close('save');
        
      },error=>{
        console.log(error);
        alert(error);
      })      
    }
  // }
  

}


