import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChatService } from 'src/app/Services/chat.service';
import { PrivateChatComponent } from '../private-chat/private-chat.component';
import { UserauthService } from 'src/app/Services/userauth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy{

  @Output() closeChatEmitter = new EventEmitter();

  constructor(public chatService:UserauthService, private modalService:NgbModal, private route:Router){

  }
  ngOnDestroy(): void {
    this.chatService.stopChatConnection();
  }

  ngOnInit(): void {
    this.chatService.createChatConnection();
    }

  backToHome(){
    this.closeChatEmitter.emit();
    this.route.navigate([''])
  }

  sendMessage(content: string){
    this.chatService.sendMessage(content)
  }

  openPrivateChat(toUser: string){
    const modalRef = this.modalService.open(PrivateChatComponent);
    modalRef.componentInstance.toUser = toUser;
  }
}
