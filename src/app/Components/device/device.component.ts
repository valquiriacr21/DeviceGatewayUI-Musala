import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GatewayDeviceService } from 'src/app/Services/gateway-device.service';
//Paginator
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';

import{MatDialogRef,MatDialog,MAT_DIALOG_DATA} from '@angular/material/dialog';
// import { DialogDeviceComponent } from '../dialog-device/dialog-device.component';

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

   //paginator table
//
  displayedColumns: string[] = ['uid','vendor', 'status', 'dateCreated', 'gatewaySerialNumber','action'];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor(
    private fb:FormBuilder, 
    private _gatewayDeviceService:GatewayDeviceService,
    private dialog:MatDialog
    ) {
    this.form=this.fb.group({
      vendor:['',Validators.required],
      dateCreated:['',Validators.required],
      status:['',Validators.required],
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
  onClickRow(serialNumber: string){
    console.log(serialNumber);

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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
      this.dataSource=new MatTableDataSource(data);
      this.dataSource.paginator=this.paginator;
      this.dataSource.sort=this.sort;
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
        alert("Device Added succesfully");
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
     this.form.patchValue({
      vendor:device.vendor,
      dateCreated:device.dateCreated,
      status:device.status,
      gatewaySerialNumber:device.gatewaySerialNumber,     
    })  
    // this.dialog.open(DialogDeviceComponent,{
    //   width:'30%',
    //   data:device,               
    // }).afterClosed().subscribe(val=>{
    //   // if(val==='update'){
    //     this.getDevices();
    //   // }
    // });
    
  }


/*    this.action='Edit';
    this.id=gateway.serialNumber;
    this.form.patchValue({
      serialNumber: gateway.serialNumber,
      name:gateway.name,      
      ipV4:gateway.ipV4,
    })  
    this.dialog.open(DialogComponent,{
      width:'30%',
      data:gateway,            
    }).afterClosed().subscribe(val=>{
      // if(val==='update'){
        this.getGateways();
      // }
    });*/
}
