import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RoomCategories } from 'src/app/variables/room-categories';
import { env } from 'src/app/variables/env';

@Injectable({
  providedIn: 'root'
})
export class RoomCategoriesService {

  constructor(private http:HttpClient) { }
  createRoomCategory(data):Observable<any>{
    let url = `${env.apiURL}/room-category`
    return this.http.post(url,data);
  }
  getRoomCategory(id):Observable<any>{
    let url = `${env.apiURL}/room-category/${id}`
    return this.http.get(url);
  }
  updateRoomCategory(id,data):Observable<any>{
    let url = `${env.apiURL}/room-category/${id}`
    return this.http.put(url,data);
  }
  listRoomCategory(dataTablesParameters):Observable<any>{
    let url = `${env.apiURL}/list-room-category`
    return this.http.post(url,dataTablesParameters);
  }
  deleteRoomCategory(id):Observable<any>{
    let url = `${env.apiURL}/room-category/${id}`
    return this.http.delete(url);
  }
}
