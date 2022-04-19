import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { env } from 'src/app/variables/env';

@Injectable({
  providedIn: 'root'
})
export class LoyaltyService {

  constructor(private http:HttpClient) { }
  updateLoyalty(data):Observable<any>{
    let url = `${env.apiURL}/loyalty`;
    return this.http.post(url,data);
  }
  listLoyalty(data):Observable<any>{
    let url = `${env.apiURL}/list-loyalty`;
    return this.http.post(url,data);
  }
  lastLoyalty():Observable<any>{
    let url = `${env.apiURL}/last-loyalty`;
    return this.http.get(url);
  }
}