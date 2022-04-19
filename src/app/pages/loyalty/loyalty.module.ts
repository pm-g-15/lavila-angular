import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoyaltyRoutingModule } from './loyalty-routing.module';
import { LoyaltyComponent } from './loyalty.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoyaltyService } from './loyalty.service';
import { AuthInterceptor } from 'src/app/auth-interceptor';
import { DataTablesModule } from 'angular-datatables';
import { HistoryComponent } from './history/history.component';


@NgModule({
  declarations: [LoyaltyComponent, HistoryComponent],
  imports: [
    CommonModule,
    LoyaltyRoutingModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    DataTablesModule,
    HttpClientModule
  ],
  providers:[
    LoyaltyService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ]
})
export class LoyaltyModule { }
