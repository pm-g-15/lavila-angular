import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomersRoutingModule } from './customers-routing.module';
import { HomeComponent } from './home/home.component';
import { ViewComponent } from './view/view.component';
import { DataTablesModule } from 'angular-datatables';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CustomersService } from './customers.service';
import { AuthInterceptor } from 'src/app/auth-interceptor';


@NgModule({
  declarations: [HomeComponent, ViewComponent],
  imports: [
    CommonModule,
    CustomersRoutingModule,
    DataTablesModule,
    NgbModule,
    HttpClientModule
  ],
  providers:[
    CustomersService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ]
})
export class CustomersModule { }
