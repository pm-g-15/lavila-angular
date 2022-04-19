import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { AgmCoreModule } from '@agm/core';

import { BranchesRoutingModule } from './branches-routing.module';
import { HomeComponent } from './home/home.component';
import { CreateComponent } from './create/create.component';
import { UpdateComponent } from './update/update.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateNearestComponent } from './update-nearest/update-nearest.component';
import { NgbAccordionModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FeedbacksComponent } from './feedbacks/feedbacks.component';


@NgModule({
  declarations: [HomeComponent, CreateComponent, UpdateComponent, UpdateNearestComponent, FeedbacksComponent],
  imports: [
    CommonModule,
    BranchesRoutingModule,
    DataTablesModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDYGvisNxLRyici-w8pq9a0Wu6lufZqXXQ',
      libraries:['places']
    }),
    HttpClientModule,
    FormsModule,
    NgbAccordionModule,
    ReactiveFormsModule,
    NgbModule
  ]
})
export class BranchesModule { }
