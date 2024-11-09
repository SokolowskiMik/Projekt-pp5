import { Component, OnInit } from '@angular/core';
import { DeviceService, Device } from './device.service';

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html'
})
export class DeviceListComponent implements OnInit {
  devices: Device[] = [];

  constructor(private deviceService: DeviceService) {}

  ngOnInit() {
    this.deviceService.getDevices().subscribe((data) => {
      this.devices = data;
    });
  }
}