import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BannerRoutingModule } from './banner-routing.module';
import { HomeComponent } from './home/home.component';
import { CreateComponent } from './create/create.component';
import { UpdateComponent } from './update/update.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BannerService } from './banner.service';
import { AuthInterceptor } from 'src/app/auth-interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';


@NgModule({
  declarations: [HomeComponent, CreateComponent, UpdateComponent],
  imports: [
    CommonModule,
    BannerRoutingModule,
    HttpClientModule,
    FormsModule,
    DataTablesModule,
    ReactiveFormsModule
  ],
  providers:[
    BannerService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ]
})
export class BannerModule { }
