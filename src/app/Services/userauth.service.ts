import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { Observable } from 'rxjs';
import { Message } from '../Models/message';
import { PrivateChatComponent } from '../Components/private-chat/private-chat.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class UserauthService {

  myName: string = '';
  private chatConnection?: HubConnection;
  onlineUsers: string[]= [];
  messages: Message[] = [];
  privateMessgaes: Message[] =[];
  privateMessageInitiated = false;

  private readonly baseUrl = "https://localhost:44352/";

  private readonly registerUrl = `${this.baseUrl}api/Auth/register`;
  private readonly loginUrl = `${this.baseUrl}api/Auth/login`;

  private readonly userUrl = (id: Number) => `${this.baseUrl}/${id}`;

  private readonly headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json');

  private readonly token = localStorage.getItem("token");
  private readonly userId =Number(localStorage.getItem("id"));

  constructor(private readonly http: HttpClient,private modalService:NgbModal) { }


  getAllUser(){
    return this.http.get<any>(`${this.baseUrl}api/Auth/getAllUser`);
  }

  // add data into database [post]
  postData(data: any): Observable<any> {
    return this.http.post<any>(this.registerUrl,data);
  }

  // login or authenticate
  login(data: any): Observable<any>{
    return this.http.post<any>(this.loginUrl, data);
  }

  createChatConnection(){
    console.log(this.baseUrl);

    this.chatConnection = new HubConnectionBuilder()
    .withUrl(`${this.baseUrl}hubs/chat`).withAutomaticReconnect().build();
    
    this.chatConnection.start().catch(error => {
      console.log(error)
    });

    this.chatConnection.on('UserConnected', () => {
     this.addUserConnectionId();
    });

    this.chatConnection.on('OnlineUsers', (onlineUsers) => {
      this.onlineUsers = [...onlineUsers];
     })

     this.chatConnection.on('NewMessage', (newMessage: Message) => {
      this.messages = [...this.messages, newMessage]
     })

     this.chatConnection.on('OpenPrivateChat', (newMessage: Message) => {
      this.privateMessgaes = [...this.privateMessgaes, newMessage];
      this.privateMessageInitiated = true;
      const modalRef = this.modalService.open(PrivateChatComponent);
      modalRef.componentInstance.toUser = newMessage.from;
     })

     this.chatConnection.on('NewPrivateMessage', (newMessage: Message) => {
      this.privateMessgaes = [...this.privateMessgaes, newMessage]
     })

     this.chatConnection.on('CloseProivateChat', () => {
      this.privateMessageInitiated = false;
      this,this.privateMessgaes = [];
      this.modalService.dismissAll();
     })

  }

  stopChatConnection(){
    this.chatConnection?.stop().catch(error => console.log(error))
  }

  async addUserConnectionId(){
    return this.chatConnection?.invoke('AddUserConnectionId', this.myName)
    .catch(error => console.log(error));
  }

  async sendMessage(content: string){
    const message: Message = {
      from: this.myName,
      content
    };
    return this.chatConnection?.invoke('RecieveMessage', message)
    .catch(error => console.log(error));
  }

  async sendPrivateMessage(to: string, content:string){
    const message: Message = {
      from: this.myName,
      to,
      content
    };

    if(!this.privateMessageInitiated){
      this.privateMessageInitiated = true;
      return this.chatConnection?.invoke('CreatePrivateChat', message).then(() => {
        this.privateMessgaes = [...this.privateMessgaes, message]
      })
      .catch(error => console.log(error));
    } else {
      return this.chatConnection?.invoke('RecievePrivateMessage', message)
      .catch(error => console.log(error));
    }
  }

  async closePrivateChatMessage(otherUser: string){
    return this.chatConnection?.invoke('RemovePrivateChat', this.myName, otherUser)
    .catch(error => console.log(error));
  }
}