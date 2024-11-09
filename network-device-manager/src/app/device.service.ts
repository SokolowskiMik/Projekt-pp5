import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";


export interface Device {
    id?: number;
    name: string;
    type: string;
    ip_address: string;
    description: string;
}


@Injectable({
    providedIn: 'root'
})
export class DeviceService {
    private apiUrl = 'http://127.0.0.1:8000/api/devices/';

    constructor(private http: HttpClient) {}


    getDevices(): Observable<Device[]> {
        return this.http.get<Device[]>(this.apiUrl);
      }
    
    addDevice(device: Device): Observable<Device> {
        return this.http.post<Device>(this.apiUrl, device);
      }
}