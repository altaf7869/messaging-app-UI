import { Component, EventEmitter, OnInit, Output,  } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserauthService } from 'src/app/Services/userauth.service';

@Component({
  selector: 'app-chat-input',
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.css']
})
export class ChatInputComponent implements OnInit{
  message: string | undefined;
  content: any;
  @Output() contentEmmiter = new EventEmitter();
  //@ViewChild('messageForm') messageForm: NgForm | undefined;
  messageForm: NgForm | undefined;
  //private hubConnection: HubConnection;

  constructor(private userService:UserauthService){

  }
  
  ngOnInit(): void {
  }
  // sendMessage(){
  //   if(this.content.trim() !== ""){
  //     this.contentEmmiter.emit(this.content);
  //   }
  //   //this.content = '';
  // }
  sendMessage(){
    //this.chatService.sendPrivateMessage(this.toUser, content)

      this.userService.sendMsg({ message: this.message }).subscribe((res) => {
        console.log(res,'resss')
       })
    }
  
}
