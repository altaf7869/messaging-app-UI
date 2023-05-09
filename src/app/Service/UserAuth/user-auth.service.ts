import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  private readonly baseUrl = "https://localhost:7101/api/Auth";
  private readonly userUrl = (id: Number) => `${this.baseUrl}/${id}`;
  private readonly headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json');
  constructor(private http: HttpClient) {
  }
  // login or authenticate
  login(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, data, { headers: this.headers });
  }
  // add data into database [post]
  postData(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/register`, data, { headers: this.headers });
  }
}


