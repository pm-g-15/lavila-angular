import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { env } from 'src/app/variables/env';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {

  constructor(private http:HttpClient) { }
  getRoomCategories():Observable<any>{
    let url = `${env.apiURL}/room-category`;
    return this.http.get(url);
  }
  getAmenities():Observable<any>{
    let url = `${env.apiURL}/room-amenities`;
    return this.http.get(url);
  }
  getBranches():Observable<any>{
    let url = `${env.apiURL}/active-branch`;
    return this.http.get(url);
  }
  getRoomBedTypes():Observable<any>{
    let url = `${env.apiURL}/room-bed-type`;
    return this.http.get(url);
  }
  createRoom(data):Observable<any>{
    let url = `${env.apiURL}/room`;
    return this.http.post(url,data);
  }
  updateRoom(id,data):Observable<any>{
    let url = `${env.apiURL}/room/${id}`;
    return this.http.put(url,data);
  }
  getRoom(id):Observable<any>{
    let url = `${env.apiURL}/room/${id}`;
    return this.http.get(url);
  }
  getAddons(roomId):Observable<any>{
    let url = `${env.apiURL}/room-addon/${roomId}`;
    return this.http.get(url);
  }
  createRoomAddon(data):Observable<any>{
    let url = `${env.apiURL}/update-room-addon`;
    return this.http.post(url,data);
  }
  createChooseRoomAddon(data):Observable<any>{
    let url = `${env.apiURL}/create-room-addon`;
    return this.http.post(url,data);
  }
  getRooms(data):Observable<any>{
    let url = `${env.apiURL}/list-room`;
    return this.http.post(url,data);
  }
  deleteRoom(id):Observable<any>{
    let url = `${env.apiURL}/room/${id}`;
    return this.http.delete(url);
  }
  updateRoomAvailability(data):Observable<any>{
    let url = `${env.apiURL}/update-room-date`;
    return this.http.post(url,data);
  }
  setRoomFeatured(id):Observable<any>{
    let url = `${env.apiURL}/set-room-featured/${id}`;
    return this.http.get(url);
  }
  setRoomUnfeatured(id):Observable<any>{
    let url = `${env.apiURL}/set-room-unfeatured/${id}`;
    return this.http.get(url);
  }
  deleteAddon(id):Observable<any>{
    let url = `${env.apiURL}/room-addon/${id}`;
    return this.http.delete(url);
  }
  getOtherRooms(id):Observable<any>{
    let url = `${env.apiURL}/get-other-rooms/${id}`;
    return this.http.get(url);
  }
  updateRelatedRooms(data,id):Observable<any>{
    let url = `${env.apiURL}/update-related-rooms/${id}`;
    return this.http.post(url,data);
  }
  getRelatedRooms( id):Observable<any>{
    let url = `${env.apiURL}/get-related-rooms/${id}`;
    return this.http.get(url );
  }
  getRoomAvailability(data,id):Observable<any>{
    let url = `${env.apiURL}/room-availabilities/${id}`;
    return this.http.post(url,data);
  }
  getUniqueAddons():Observable<any>{
    let url = `${env.apiURL}/get-unique-addons`;
    return this.http.get(url);
  }
}
