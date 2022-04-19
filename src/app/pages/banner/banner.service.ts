import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { env } from 'src/app/variables/env';

@Injectable({
  providedIn: 'root'
})
export class BannerService {

  constructor(private http:HttpClient) { }
  createBanner(data):Observable<any>{
    let url = `${env.apiURL}/intro-banner`;
    return this.http.post(url,data);
  }
  listBanner(data):Observable<any>{
    let url = `${env.apiURL}/get-intro-banner`;
    return this.http.post(url,data);
  }
  getBanner(id):Observable<any>{
    let url = `${env.apiURL}/intro-banner/${id}`;
    return this.http.get(url);
  }
  deleteBanner(id):Observable<any>{
    let url = `${env.apiURL}/intro-banner/${id}`;
    return this.http.delete(url);
  }
  updateBanner(data,id):Observable<any>{
    let url = `${env.apiURL}/intro-banner/${id}`;
    return this.http.put(url,data);
  }
}
