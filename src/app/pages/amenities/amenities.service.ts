import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { env } from 'src/app/variables/env';

@Injectable({
  providedIn: 'root'
})
export class AmenitiesService {

  constructor(private http:HttpClient) { }
  getAmenitiesType():Observable<any>{
    let url = `${env.apiURL}/amenities-type`;
    return this.http.get(url);
  }
  getAmenitiesIcon():Observable<any>{
    let url = `${env.apiURL}/amenities-icon`;
    return this.http.get(url);
  }
  createAmenity(data):Observable<any>{
    let url = `${env.apiURL}/amenities`;
    return this.http.post(url,data);
  }
  updateAmenity(data,id):Observable<any>{
    let url = `${env.apiURL}/amenities/${id}`;
    return this.http.put(url,data);
  }
  listAmenities(data):Observable<any>{
    let url = `${env.apiURL}/list-amenities`;
    return this.http.post(url,data);
  }
  deleteAmenity(id):Observable<any>{
    let url = `${env.apiURL}/amenities/${id}`;
    return this.http.delete(url);
  }
  getAmenity(id):Observable<any>{
    let url = `${env.apiURL}/amenities/${id}`;
    return this.http.get(url);
  }
  setAmenitiesFeatured(id):Observable<any>{
    let url = `${env.apiURL}/set-amenities-featured/${id}`;
    return this.http.get(url);
  }
  setAmenitiesUnfeatured(id):Observable<any>{
    let url = `${env.apiURL}/set-amenities-unfeatured/${id}`;
    return this.http.get(url);
  }
}
