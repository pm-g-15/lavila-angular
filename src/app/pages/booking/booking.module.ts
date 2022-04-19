import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DataTablesModule } from "angular-datatables";

import { BookingRoutingModule } from "./booking-routing.module";
import { HomeComponent } from "./home/home.component";
import { ViewComponent } from "./view/view.component";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { BookingService } from "./booking.service";
import { AuthInterceptor } from "src/app/auth-interceptor";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { CompletedComponent } from "./completed/completed.component";
import { UpcomingComponent } from "./upcoming/upcoming.component";
import { CancelledComponent } from "./cancelled/cancelled.component";
import { NoshowComponent } from "./noshow/noshow.component";
import { InvalidComponent } from "./invalid/invalid.component";

@NgModule({
  declarations: [
    HomeComponent,
    ViewComponent,
    CompletedComponent,
    UpcomingComponent,
    CancelledComponent,
    NoshowComponent,
    InvalidComponent,
  ],
  imports: [
    CommonModule,
    BookingRoutingModule,
    DataTablesModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
  ],
  providers: [
    BookingService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
})
export class BookingModule {}
