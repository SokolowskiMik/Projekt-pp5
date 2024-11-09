import { Component } from '@angular/core';
import { DeviceService, Device } from './device.service';

@Component({
  selector: 'app-device-form',
  templateUrl: './device-form.component.html'
})
export class DeviceFormComponent {
  newDevice: Device = { name: '', type: 'Router', ip_address: '', description: '' };
  deviceTypes = ['Router', 'Switch', 'Server'];

  constructor(private deviceService: DeviceService) {}

  addDevice() {
    this.deviceService.addDevice(this.newDevice).subscribe();
  }
}
