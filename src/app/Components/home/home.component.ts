import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChatService } from 'src/app/Services/chat.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
userForm: FormGroup = new FormGroup({});
submitted = false;
errorMessage: string[] = [];
openChat = false;

constructor(private formbuilder:FormBuilder, private chatService:ChatService){
}
ngOnInit(): void {
  this.initializeForm();
}

initializeForm(){
  this.userForm = this.formbuilder.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
    email: ['', [Validators.required]],
    password: ['', [Validators.required]]
  })
}
  submitForm(){
    this.submitted = true;
    this.errorMessage = [];
    if(this.userForm.valid){
      this.chatService.registerUser(this.userForm.value).subscribe({
        next: () => {
          this.chatService.myName = this.userForm.get('name')?.value;
          this.openChat = true;
          this.userForm.reset();
          this.submitted = false;
        },
        error: error => {
          if(typeof (error.error) !== 'object'){
            this.errorMessage.push(error.error);
          }
        }
      })
    }
  }

  closeChat(){
    this.openChat = false;
  }
}
