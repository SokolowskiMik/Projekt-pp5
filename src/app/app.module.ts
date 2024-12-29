import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { routes } from './app.routes';
import { AppComponent } from './app.component';

import { HomeComponent } from './components/home/home.component';
import { NetworkFormComponent } from './components/network-form/network-form.component';
import { DeviceFormComponent } from './components/device-form/device-form.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NetworkDetailsComponent } from './components/network-details/network-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NetworkFormComponent,
    DeviceFormComponent,
    UserFormComponent,
    NetworkDetailsComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
