import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { env } from 'src/app/variables/env';

@Injectable({
  providedIn: 'root'
})
export class OffersService {

  constructor(private http:HttpClient) { }
  createOffer(data):Observable<any>{
    let url = `${env.apiURL}/offer`;
    return this.http.post(url,data);
  }
  getRooms():Observable<any>{
    let url = `${env.apiURL}/room`;
    return this.http.get(url);
  }
  listOffer(data):Observable<any>{
    let url = `${env.apiURL}/list-offer`;
    return this.http.post(url,data);
  }
  getOffer(id):Observable<any>{
    let url = `${env.apiURL}/offer/${id}`;
    return this.http.get(url);
  }
  updateOffer(data,id):Observable<any>{
    let url = `${env.apiURL}/offer/${id}`;
    return this.http.put(url,data);
  }
  deleteOffer(id):Observable<any>{
    let url = `${env.apiURL}/offer/${id}`;
    return this.http.delete(url);
  }
}
