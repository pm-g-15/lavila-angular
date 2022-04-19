import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'ni-tv-2 text-primary', class: '' }, 
    { path: '/banner', title: 'Banner',  icon:'fa fa-align-center text-info', class: '' },
    { path: '/branches', title: 'Branches',  icon:'fa fa-random text-blue', class: '' },
    { path: '/users', title: 'Admin Users',  icon:'fa fa-user-shield text-orange', class: '' }, 
    { path: '/amenities', title: 'Amenities',  icon:'fa fa-hand-holding text-red', class: '' }, 
    { path: '/room-categories', title: 'Room Categories',  icon:'fa fa-door-open text-green', class: '' },
    { path: '/rooms', title: 'Rooms',  icon:'fa fa-door-open text-yellow', class: '' },
    { path: '/offers', title: 'Offers',  icon:'fa fa-percentage text-orange', class: '' },
    { path: '/room-calendar', title: 'Room Calendar',  icon:'fa fa-calendar-alt text-blue', class: '' }, 
    { path: '/booking', title: 'Booking',  icon:'fa fa-plus-circle text-pink', class: '' }, 
    { path: '/promo-codes', title: 'Promo Codes',  icon:'fa fa-gift text-blue', class: '' },
    { path: '/events', title: 'Events',  icon:'fa fa-calendar-check text-green', class: '' }, 
    { path: '/properties', title: 'Properties',  icon:'fa fa-globe-asia text-info', class: '' },
    { path: '/customers', title: 'Customers',  icon:'fa fa-user-shield text-orange', class: '' }, 
    { path: '/loyalty', title: 'Loyalty',  icon:'fa fa-percentage text-blue', class: '' },
    { path: '/instructions', title: 'Instructions',  icon:'fa fa-book-reader text-orange', class: '' },
];

@Component({
  selector: 'components-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }
  logout(){
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('refresh_token');
    sessionStorage.removeItem('auth');
    this.router.navigate(['/login']);
  }
}
