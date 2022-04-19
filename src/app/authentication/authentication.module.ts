import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LoginComponent } from './login/login.component';
import { AuthenticationService } from './authentication.service';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ComponentsModule
  ],
  providers:[
    AuthenticationService
  ]
})
export class AuthenticationModule { }
