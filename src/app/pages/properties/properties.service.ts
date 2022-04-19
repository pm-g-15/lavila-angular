import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { env } from 'src/app/variables/env';

@Injectable({
  providedIn: 'root'
})
export class PropertiesService {

  constructor(private http:HttpClient) { }
  createProperty(data):Observable<any>{
    let url = `${env.apiURL}/property`
    return this.http.post(url,data);
  }
  getAmenities():Observable<any>{
    let url = `${env.apiURL}/property-amenities`;
    return this.http.get(url);
  }
  getPropertyPurpose():Observable<any>{
    let url = `${env.apiURL}/api/list-all-property-purpose`;
    return this.http.get(url);
  }
  getPropertyType():Observable<any>{
    let url = `${env.apiURL}/api/list-all-property-type`;
    return this.http.get(url);
  }
  getPropertyLookingFor():Observable<any>{
    let url = `${env.apiURL}/api/list-all-property-looking-for`;
    return this.http.get(url);
  }
  getPropertyLocation():Observable<any>{
    let url = `${env.apiURL}/api/list-all-property-location`;
    return this.http.get(url);
  }
  listProperties(data):Observable<any>{
    let url = `${env.apiURL}/list-property`;
    return this.http.post(url,data);
  }
  getProperty(id):Observable<any>{
    let url = `${env.apiURL}/property/${id}`;
    return this.http.get(url);
  }
  updateProperty(data,id):Observable<any>{
    let url = `${env.apiURL}/property/${id}`;
    return this.http.put(url,data);
  }
  deleteProperty(id):Observable<any>{
    let url = `${env.apiURL}/property/${id}`;
    return this.http.delete(url);
  }
  setPropertyFeatured(id):Observable<any>{
    let url = `${env.apiURL}/set-property-featured/${id}`;
    return this.http.get(url);
  }
  setPropertyUnfeatured(id):Observable<any>{
    let url = `${env.apiURL}/set-property-unfeatured/${id}`;
    return this.http.get(url);
  }
}
