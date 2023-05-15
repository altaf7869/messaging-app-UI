import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ChatService } from 'src/app/Services/chat.service';
import { UserauthService } from 'src/app/Services/userauth.service';

@Component({
  selector: 'app-private-chat',
  templateUrl: './private-chat.component.html',
  styleUrls: ['./private-chat.component.css']
})
export class PrivateChatComponent implements OnInit, OnDestroy{
@Input() toUser = '';
msg: any;
constructor(public activeModel:NgbActiveModal,public chatService:UserauthService, private userService:UserauthService){}

userId=Number(sessionStorage.getItem('id'))

  ngOnDestroy(): void {
    this.chatService.closePrivateChatMessage(this.toUser);
  }
  ngOnInit(): void {
  }

sendMessage(content: string){
 // this.chatService.sendPrivateMessage(this.toUser, content)
 this.userService.sendMsg(this.toUser);
 console.log(this.toUser,"ysere")
}

getUserId(){
  sessionStorage.getItem('id')
  console.log(sessionStorage.getItem('id'),'local id')
}
}
