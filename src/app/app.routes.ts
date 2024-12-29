import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NetworkFormComponent } from './components/network-form/network-form.component';
import { DeviceFormComponent } from './components/device-form/device-form.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { NetworkDetailsComponent } from './components/network-details/network-details.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'networkform', component: NetworkFormComponent },
  { path: 'deviceform/:networkId', component: DeviceFormComponent },
  { path: 'userform/:networkId', component: UserFormComponent },
  { path: 'network/:networkId', component: NetworkDetailsComponent },
];
