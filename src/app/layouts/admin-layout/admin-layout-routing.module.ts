import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/authentication/auth-guard.service';


const routes: Routes = [
  { path: 'dashboard',canActivateChild:[AuthGuard], canActivate:[AuthGuard], loadChildren:"../../pages/dashboard/dashboard.module#DashboardModule"},
  { path: 'branches', canActivateChild:[AuthGuard], canActivate:[AuthGuard], loadChildren:"../../pages/branches/branches.module#BranchesModule"},
  { path: 'users', canActivateChild:[AuthGuard], canActivate:[AuthGuard], loadChildren:"../../pages/users/users.module#UsersModule"},
  { path: 'rooms', canActivateChild:[AuthGuard], canActivate:[AuthGuard], loadChildren:"../../pages/rooms/rooms.module#RoomsModule"},
  { path: 'room-categories', canActivateChild:[AuthGuard], canActivate:[AuthGuard], loadChildren:"../../pages/room-categories/room-categories.module#RoomCategoriesModule"},
  { path: 'room-calendar', canActivateChild:[AuthGuard], canActivate:[AuthGuard], loadChildren:"../../pages/room-calendar/room-calendar.module#RoomCalendarModule"},
  { path: 'amenities', canActivateChild:[AuthGuard], canActivate:[AuthGuard], loadChildren:"../../pages/amenities/amenities.module#AmenitiesModule"},
  { path: 'booking', canActivateChild:[AuthGuard], canActivate:[AuthGuard], loadChildren:"../../pages/booking/booking.module#BookingModule"},
  { path: 'promo-codes', canActivateChild:[AuthGuard], canActivate:[AuthGuard], loadChildren:"../../pages/promo-codes/promo-codes.module#PromoCodesModule"},
  { path: 'properties', canActivateChild:[AuthGuard], canActivate:[AuthGuard], loadChildren:"../../pages/properties/properties.module#PropertiesModule"}, 
  { path: 'events', canActivateChild:[AuthGuard], canActivate:[AuthGuard], loadChildren:"../../pages/events/events.module#EventsModule"},
  { path: 'banner', canActivateChild:[AuthGuard], canActivate:[AuthGuard], loadChildren:"../../pages/banner/banner.module#BannerModule"},
  { path: 'customers', canActivateChild:[AuthGuard], canActivate:[AuthGuard], loadChildren:"../../pages/customers/customers.module#CustomersModule"},
  { path: 'offers', canActivateChild:[AuthGuard], canActivate:[AuthGuard], loadChildren:"../../pages/offers/offers.module#OffersModule"},
  { path: 'loyalty', canActivateChild:[AuthGuard], canActivate:[AuthGuard], loadChildren:"../../pages/loyalty/loyalty.module#LoyaltyModule"},
  { path: 'instructions', canActivateChild:[AuthGuard], canActivate:[AuthGuard], loadChildren:"../../pages/instructions/instructions.module#InstructionsModule"},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminLayoutRoutingModule { }
