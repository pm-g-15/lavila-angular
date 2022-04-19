import { Component, OnInit } from '@angular/core';

import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'dashboard-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  dashboardData = null;
  constructor(private service: DashboardService) { }
  ngOnInit() {
    this.service.getDashboardData().subscribe(res => {
      this.dashboardData = res;
    })
  }
}
