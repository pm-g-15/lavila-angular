import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { env } from 'src/app/variables/env';

@Injectable({
  providedIn: 'root'
})
export class BranchesService {

  constructor(private http:HttpClient) { }
  getAdminUser():Observable<any>{
    let url = `${env.apiURL}/list-active-admin-user`;
    return this.http.get(url);
  }
  createBranch(data):Observable<any>{
    let url = `${env.apiURL}/branch`;
    return this.http.post(url,data);
  }
  listBranch(dataTablesParameters):Observable<any>{
    let url = `${env.apiURL}/list-branch`
    return this.http.post(url,dataTablesParameters);
  }
  listBranchFeedBack(dataTablesParameters):Observable<any>{
    let url = `${env.apiURL}/list-branch-feedbacks`
    return this.http.post(url,dataTablesParameters);
  }
  deleteBranch(id):Observable<any>{
    let url = `${env.apiURL}/branch/${id}`
    return this.http.delete(url);
  }
  getBranch(id):Observable<any>{
    let url = `${env.apiURL}/branch/${id}`;
    return this.http.get(url);
  }
  updateBranch(id,data):Observable<any>{
    let url = `${env.apiURL}/branch/${id}`;
    console.log(data)
    return this.http.put(url,data);
  }

  
  createBranchNearestCategory( data):Observable<any>{
    let url = `${env.apiURL}/branch-nearest-category`;
    return this.http.post(url, data);
  }
  listBranchNearestCategory( id):Observable<any>{
    let url = `${env.apiURL}/list-branch-nearest-category/${id}`;
    return this.http.get(url);
  }
  deleteBranchNearestCategory(id):Observable<any>{
    let url = `${env.apiURL}/branch-nearest-category/${id}`;
    return this.http.delete(url);
  }
  createBranchNearestItem(data):Observable<any>{
    let url = `${env.apiURL}/branch-nearest-item`;
    return this.http.post(url, data);
  }
  deleteBranchNearestItem(id):Observable<any>{
    let url = `${env.apiURL}/branch-nearest-item/${id}`;
    return this.http.delete(url);
  }
}
