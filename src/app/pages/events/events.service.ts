import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { env } from 'src/app/variables/env';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private http:HttpClient) { }
  createEvent(data):Observable<any>{
    let url = `${env.apiURL}/event`;
    return this.http.post(url,data);
  }
  listEvent(data):Observable<any>{
    let url = `${env.apiURL}/list-event`;
    return this.http.post(url,data);
  }
  getEvent(id):Observable<any>{
    let url = `${env.apiURL}/event/${id}`;
    return this.http.get(url);
  }
  updateEvent(data,id):Observable<any>{
    let url = `${env.apiURL}/event/${id}`;
    return this.http.put(url,data);
  }
  deleteEvent(id):Observable<any>{
    let url = `${env.apiURL}/event/${id}`;
    return this.http.delete(url);
  }
  setEventFeatured(id):Observable<any>{
    let url = `${env.apiURL}/set-event-featured/${id}`;
    return this.http.get(url);
  }
  setEventUnfeatured(id):Observable<any>{
    let url = `${env.apiURL}/set-event-unfeatured/${id}`;
    return this.http.get(url);
  }
}
