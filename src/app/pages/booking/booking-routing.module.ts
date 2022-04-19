import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ViewComponent } from './view/view.component'; 
import { CompletedComponent } from './completed/completed.component';
import { UpcomingComponent } from './upcoming/upcoming.component';
import { CancelledComponent } from './cancelled/cancelled.component';
import { NoshowComponent } from './noshow/noshow.component';
import { InvalidComponent } from './invalid/invalid.component';


const routes: Routes = [
  {path:"",component:HomeComponent,pathMatch:"full"},
  {path:"completed",component:CompletedComponent},
  {path:"upcoming",component:UpcomingComponent},
  {path:"cancelled",component:CancelledComponent},
  {path:"noshow",component:NoshowComponent},
  {path:"invalid",component:InvalidComponent},
  {path:"view/:id",component:ViewComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookingRoutingModule { }
