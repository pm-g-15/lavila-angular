import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PropertiesRoutingModule } from './properties-routing.module';
import { HomeComponent } from './home/home.component';
import { CreateComponent } from './create/create.component';
import { UpdateComponent } from './update/update.component';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { PropertiesService } from './properties.service';
import { AuthInterceptor } from 'src/app/auth-interceptor';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [HomeComponent, CreateComponent, UpdateComponent],
  imports: [
    CommonModule,
    PropertiesRoutingModule,
    FormsModule,
    DataTablesModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDYGvisNxLRyici-w8pq9a0Wu6lufZqXXQ',
      libraries:['places']
    }),
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers:[
    PropertiesService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ]
})
export class PropertiesModule { }
