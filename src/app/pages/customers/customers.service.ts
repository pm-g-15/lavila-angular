import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { env } from 'src/app/variables/env';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  constructor(private http:HttpClient) { }
  listCustomers(dataTablesParameters):Observable<any>{
    let url = `${env.apiURL}/list-customers`
    return this.http.post(url,dataTablesParameters);
  }
  blockCustomer(id):Observable<any>{
    let url = `${env.apiURL}/block-customer/${id}`;
    return this.http.get(url);
  }
  enableCustomer(id):Observable<any>{
    let url = `${env.apiURL}/enable-customer/${id}`;
    return this.http.get(url);
  }
}
