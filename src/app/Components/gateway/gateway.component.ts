import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { ChildActivationStart, RouterLink, RouterLinkActive } from '@angular/router';
import { GatewayDeviceService } from 'src/app/Services/gateway-device.service';
// import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-gateway',
  templateUrl: './gateway.component.html',
  styleUrls: ['./gateway.component.css']
})

// @Component({
//   selector: 'table-expandable-rows-example',
//   styleUrls: ['table-expandable-rows-example.css'],
//   templateUrl: 'table-expandable-rows-example.html',
//   animations: [
//     trigger('detailExpand', [
//       state('collapsed', style({height: '0px', minHeight: '0'})),
//       state('expanded', style({height: '*'})),
//       transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
//     ]),
//   ],
// })
// export class TableExpandableRowsExample {
//   @Input() ELEMENT_DATA:GatewaysElement[]=[];
//   dataSource = ELEMENT_DATA;
//   columnsToDisplay = ['Serial Number', 'Name', 'IPV4'];
//   columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
//   expandedElement: GatewaysElement | null;
// }

// export interface  GatewaysElement {
//   serialNumber: string;
//   name: string;
//   ipv4: string;
// }


export class GatewayComponent implements OnInit {
  @Input() ListGatewayCaptures:any[]=[];
  @Output() parametrosSeleccionados=new EventEmitter<any>();
  listDevicesOfGatewaybySerialNumber:any[]=[];
  GatewaySelected:any;
  serialNumberOfGatewaySelected:any;
  @Output() ELEMENT_DATA:any[]=[];
  @Output() listGateways:any[]=[];
  // c:any[]=[];
  action='Add';
  form:FormGroup;
  id:number|undefined; 
  // row:any;
  // SelectedRow:any;
  // dataSource = this.ELEMENT_DATA;
  // columnsToDisplay = ['Serial Number', 'Name', 'IPV4'];
  // columnsToDisplayWithExpand = [this.columnsToDisplay, 'expand'];
  // expandedElement: GatewaysElement | null;
  //DisplayState: 'none';
  // constructor(){}
  constructor(private fb:FormBuilder, private _gatewayDeviceService:GatewayDeviceService) {
    this.form=this.fb.group({
      serialNumber:['',Validators.required],
      name:['',Validators.required],
      ipV4:['',Validators.required]
    })
  }

  ngOnInit(): void {
    this.getGateways();
    this.intialGateway();
    // this.ELEMENT_DATA=this.listGateways;
  }
  
  onClickRow(serialNumber: string){
    console.log(serialNumber);

  }
  // TableExpandableRowsExample() {
  //   var dataSource = this.ELEMENT_DATA;
  //   var columnsToDisplay = ['Serial Number', 'Name', 'IPV4'];
  //   var columnsToDisplayWithExpand = [this.columnsToDisplay, 'expand'];
  //   expandedElement: GatewaysElement | null;
  // }
  
  getGateways(){
    this._gatewayDeviceService.getListGateways().subscribe(data=>{
      console.log(data);
      this.listGateways=data;
      
      // this.ListGatewayCapture=data;
    },error=>{
      console.log(error);
    })    
  }

  intialGateway(){
    this._gatewayDeviceService.getListGateways().subscribe(data=>{
      console.log(data[0]);
    this.GatewaySelected=data[0];
    // this.GatewaySelected.name=this.listGateways[0].name;
    // this.GatewaySelected.ipV4=this.listGateways[0].ipV4;
    //console.log('serial number:',GatewaySelected.serialNumber.);
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

    if(this.id==undefined){
      //Add new gateway
      this._gatewayDeviceService.saveGateway(gateway).subscribe(data=>{
        this.getGateways();
        this.form.reset();
        alert("Gateway Added succesfully")
      },error=>{
        console.log(error);
      })      
    }else{
      gateway.serialNumber=this.id;
      //edit gateway
      this._gatewayDeviceService.updateGateway(this.id,gateway).subscribe(data=>{
        this.form.reset();
        this.action="Add";
        this.id=undefined;
        this.getGateways();
        alert("Gateway Updated succesfully");
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
    this.action='Edit';
    this.id=gateway.serialNumber;
    this.form.patchValue({
      serialNumber: gateway.serialNumber,
      name:gateway.name,      
      ipV4:gateway.ipV4,
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
      // RouterLinkActive()
    }

    ShowGatewayWithYourDevices(){
      // console.log(this.categoriaSeleccionada);
      // console.log(this.paisSeleccionado);
      const PARAMETROS ={
        serialNumberOfGatewaySelected: this.GatewaySelected.serialNumber
        //listDevicesOfGatewaybySerialNumber: this.listDevicesOfGatewaybySerialNumber
      }
      this.parametrosSeleccionados.emit(PARAMETROS)
    }
      
  
  }

  



