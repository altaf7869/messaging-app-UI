import { Component, Input, OnInit } from '@angular/core';
import { Message } from 'src/app/Models/message';
import { UserauthService } from 'src/app/Services/userauth.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit{

  @Input() messages: Message[] = [];
constructor(private userService:UserauthService){
  sessionStorage.getItem('id')
}

ngOnInit(): void {
   this.recvMessage();
  }

recvMessage(){
  this.userService.recvMsg().subscribe((response) => {
    this.messages = response;
    console.log(response, "messg responce")
    }); 
}
}
