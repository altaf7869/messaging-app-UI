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

constructor(public activeModel:NgbActiveModal,public chatService:UserauthService){}

  ngOnDestroy(): void {
    this.chatService.closePrivateChatMessage(this.toUser);
  }
  ngOnInit(): void {
  }

sendMessage(content: string){
  this.chatService.sendPrivateMessage(this.toUser, content)
}

}
