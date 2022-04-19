import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { env } from 'src/app/variables/env';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http:HttpClient) { }
  getDashboardData():Observable<any>{
    let url = `${env.apiURL}/dashboard-data`;
    return this.http.get(url);
  }
  
}
