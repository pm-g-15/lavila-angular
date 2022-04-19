import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { env } from 'src/app/variables/env';

@Injectable({
  providedIn: 'root'
})
export class PromoCodesService {

  constructor(private http:HttpClient) { }
  listBranch():Observable<any>{
    let url = `${env.apiURL}/active-branch`;
    return this.http.get(url);
  }
  getAllNormalUsers():Observable<any>{
    let url = `${env.apiURL}/list-normal-user`;
    return this.http.get(url);
  }
  createPromoCode(data):Observable<any>{
    let url = `${env.apiURL}/promo-code`;
    return this.http.post(url,data);
  }
  getAllPromoCode():Observable<any>{
    let url = `${env.apiURL}/promo-code`;
    return this.http.get(url);
  }
  listPromoCode(data):Observable<any>{
    let url = `${env.apiURL}/list-promo-code`;
    return this.http.post(url,data);
  }
  getPromoCode(id):Observable<any>{
    let url = `${env.apiURL}/promo-code/${id}`;
    return this.http.get(url);
  }
  updatePromoCode(data,id):Observable<any>{
    let url = `${env.apiURL}/promo-code/${id}`;
    return this.http.put(url,data);
  }
  deletePromoCode(id):Observable<any>{
    let url = `${env.apiURL}/promo-code/${id}`;
    return this.http.delete(url);
  }
}
