import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { HomeComponent } from './home/home.component';
import { CreateComponent } from './create/create.component';
import { UpdateComponent } from './update/update.component';
import { UpdateNearestComponent } from './update-nearest/update-nearest.component';
import { FeedbacksComponent } from './feedbacks/feedbacks.component';


const routes: Routes = [
  {path:"",component:HomeComponent,pathMatch:"full"},
  {path:"create",component:CreateComponent},
  {path:"update/:id",component:UpdateComponent},
  {path:"update-nearest/:branchId",component:UpdateNearestComponent},
  {path:"feedbacks/:branchId",component:FeedbacksComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BranchesRoutingModule { }
