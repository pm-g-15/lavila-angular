import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SafePipe } from './safe/safe.pipe'; 



@NgModule({
  declarations: [NavbarComponent, FooterComponent, SidebarComponent, SafePipe ],
  imports: [
    CommonModule,
    RouterModule,
    NgbModule 
  ],
  exports: [NavbarComponent, FooterComponent, SidebarComponent, SafePipe ]
})
export class ComponentsModule { }
