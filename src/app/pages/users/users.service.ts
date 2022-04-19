import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { env } from 'src/app/variables/env';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http:HttpClient) { }
  createUser(data):Observable<any>{
    let url = `${env.apiURL}/admin-user`
    return this.http.post(url,data);
  }
  updateUser(id,data):Observable<any>{
    let url = `${env.apiURL}/user/${id}`
    return this.http.put(url,data);
  }
  getUser(id):Observable<any>{
    let url = `${env.apiURL}/user/${id}`
    return this.http.get(url);
  }
  listAdminUsers(dataTablesParameters):Observable<any>{
    let url = `${env.apiURL}/list-admin-user`
    return this.http.post(url,dataTablesParameters);
  }
  deleteAdminUser(id):Observable<any>{
    let url = `${env.apiURL}/user/${id}`
    return this.http.delete(url);
  }
}