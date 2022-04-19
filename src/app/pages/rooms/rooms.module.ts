import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';

import { RoomsRoutingModule } from './rooms-routing.module';
import { HomeComponent } from './home/home.component';
import { CreateComponent } from './create/create.component';
import { UpdateComponent } from './update/update.component';
import { UpdateAddonComponent } from './update-addon/update-addon.component';
import { NgbModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/app/components/components.module';
import { UpdateRelatedRoomsComponent } from './update-related-rooms/update-related-rooms.component';
import { FullCalendarModule } from '@fullcalendar/angular'; 


@NgModule({
  declarations: [HomeComponent, CreateComponent, UpdateComponent, UpdateAddonComponent,  UpdateRelatedRoomsComponent],
  imports: [
    CommonModule,
    RoomsRoutingModule,
    DataTablesModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    NgbTooltipModule,
    FullCalendarModule
  ]
})
export class RoomsModule { }
