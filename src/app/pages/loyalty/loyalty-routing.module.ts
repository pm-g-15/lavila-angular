import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoyaltyComponent } from './loyalty.component';
import { HistoryComponent } from './history/history.component';


const routes: Routes = [
  {path:"",component:LoyaltyComponent,pathMatch:"full"},
  {path:"history",component:HistoryComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoyaltyRoutingModule { }
