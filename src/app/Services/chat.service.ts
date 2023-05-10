import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../Models/user';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  baseUrl = "https://localhost:7101/"
  constructor(private http:HttpClient) { }

  registerUser(user: User){
 return this.http.post(`${this.baseUrl}api/chat/register-user`, user , {responseType:'text'})
  }
}
