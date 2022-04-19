import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'components-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public focus;
  public listTitles: any[];
  public location: Location;
  constructor(location: Location,  private element: ElementRef, private router: Router) {
    this.location = location;
  }

  ngOnInit() {
    this.listTitles = ROUTES.filter(listTitle => listTitle);
  }
  getTitle(){ 
    var titlee = this.location.prepareExternalUrl(this.location.path());
    var words = titlee.match(/([^-/]+)/g) || [];
    words.forEach(function(word, i) {
      words[i] = word[0].toUpperCase() + word.slice(1);
    });
    let v = words.join(' ');
    return v.replace(/\d+/g, '')
  }
  
  logout(){
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('refresh_token');
    sessionStorage.removeItem('auth');
    this.router.navigate(['/login']);
  }
}
