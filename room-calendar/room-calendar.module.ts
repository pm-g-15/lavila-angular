import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { RoomCalendarRoutingModule } from './room-calendar-routing.module';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RoomCalendarService } from './room-calendar.service';
import { AuthInterceptor } from 'src/app/auth-interceptor';  


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    RoomCalendarRoutingModule,
    FullCalendarModule,
    FormsModule,
    NgbModule,
    HttpClientModule 
  ],
  providers:[RoomCalendarService,{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }]
})
export class RoomCalendarModule { }
