import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GatewayDeviceService {

  constructor(private http:HttpClient) { }

  getListGateways():Observable<any>{
    const URL= 'https://localhost:44336/api/Gateways';
    return this.http.get(URL);
  }
  getListDevicesOfGateway(serialNumber:number):Observable<any>{
    const URL= 'https://localhost:44336/api/Devices/DevicesGateways='+serialNumber;
    return this.http.get(URL);
  }  
  getGateway(serialNumber:number):Observable<any>{
    const URL= 'https://localhost:44336/api/Gateways/'+serialNumber;
    return this.http.get(URL);
  }

  deleteGateway(id:number):Observable<any>{
    return this.http.delete('https://localhost:44336/api/Gateways/'+id);
  }

  saveGateway(gateway:any):Observable<any>{
    return this.http.post('https://localhost:44336/api/Gateways',gateway);
  }

  updateGateway(id:number, gateway:any):Observable<any>{
    return this.http.put('https://localhost:44336/api/Gateways/'+id,gateway);
  }

  getListDevices():Observable<any>{
    return this.http.get('https://localhost:44336/api/Devices');
  }

  deleteDevice(id:number):Observable<any>{
    return this.http.delete('https://localhost:44336/api/Devices/'+id);
  }

  saveDevice(device:any):Observable<any>{
    return this.http.post('https://localhost:44336/api/Devices',device);
  }

  updateDevice(id:number, device:any):Observable<any>{
    return this.http.put('https://localhost:44336/api/Devices/'+id,device);
  }
}
