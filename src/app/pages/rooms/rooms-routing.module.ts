import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { HomeComponent } from './home/home.component';
import { CreateComponent } from './create/create.component';
import { UpdateComponent } from './update/update.component';
import { UpdateAddonComponent } from './update-addon/update-addon.component';
import { UpdateRelatedRoomsComponent } from './update-related-rooms/update-related-rooms.component'; 


const routes: Routes = [
  {path:"",component:HomeComponent,pathMatch:"full"},
  {path:"create",component:CreateComponent},
  {path:"update-addon/:roomId",component:UpdateAddonComponent},
  {path:"update/:roomId",component:UpdateComponent},
  {path:"update-related-rooms/:roomId",component:UpdateRelatedRoomsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoomsRoutingModule { }
