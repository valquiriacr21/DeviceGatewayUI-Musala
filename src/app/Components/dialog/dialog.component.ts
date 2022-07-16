import { Component, OnInit, Input,Output } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { GatewayDeviceService } from 'src/app/Services/gateway-device.service';
// import { GatewayComponent } from 'src/app/Components/gateway/gateway.component';

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
  
  constructor(private fb:FormBuilder, private _gatewayDeviceService:GatewayDeviceService) 
  {
    this.titleOfComponent="Gateway";
    this.action="Add";
    this.form=this.fb.group({
      serialNumber:['',Validators.required,Validators.minLength(2),Validators.maxLength(450)],
      name:['',Validators.required,Validators.minLength(2),Validators.maxLength(50)],
      ipV4:['',Validators.required,Validators.minLength(7),Validators.maxLength(15),Validators.pattern("^((\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.){3}(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$")]
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
  saveGateway(){
    const gateway:any={
      serialNumber:this.form.get('serialNumber')?.value,
      name:this.form.get('name')?.value,
      ipV4:this.form.get('ipV4')?.value
    }

    // if(this.id==undefined){
    //   //Add new gateway
    //   this._gatewayDeviceService.saveGateway(gateway).subscribe(data=>{
    //     this.getGateways();
    //     this.form.reset();
        
    //   },error=>{
    //     console.log(error);
    //   })      
    // }
  }

}



