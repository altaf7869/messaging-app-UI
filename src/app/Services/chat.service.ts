import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../Models/user';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { Message } from '../Models/message';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PrivateChatComponent } from '../Components/private-chat/private-chat.component';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  myName: string = '';
  private chatConnection?: HubConnection;
  onlineUsers: string[]= [];
  messages: Message[] = [];
  privateMessgaes: Message[] =[];
  privateMessageInitiated = false;

  baseUrl = "https://localhost:44352/"

  constructor(private http:HttpClient, private modalService: NgbModal) { }

  registerUser(user: User){
    return this.http.post(`${this.baseUrl}api/chat/register`, user , {responseType:'text'})
  }

  createChatConnection(){
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
