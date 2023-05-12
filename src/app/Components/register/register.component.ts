import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ChatService } from 'src/app/Services/chat.service';
import { UserauthService } from 'src/app/Services/userauth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  RegistrationForm!: FormGroup;
  userForm: FormGroup = new FormGroup({});
  submitted = false;
  errorMessage: string[] = [];
  openChat = false;
  hide = true;

  constructor(private formBuilder: FormBuilder ,
    private userauthservice:UserauthService,
    private snackBar: MatSnackBar,
    private route:Router,public chatService:ChatService){

    this.RegistrationForm=this.formBuilder.group({

      name:['',Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
    })
   }
  
   login(){
    this.route.navigate([""])
   }

  submitForm(){
    if(this.RegistrationForm.valid){
      this.userauthservice.postData(this.RegistrationForm.value).subscribe({
        next: (res) => {
          this.userauthservice.myName = this.RegistrationForm.get('name')?.value;
          //this.openChat = true;
          this.RegistrationForm.reset();
          // this.submitted = false;
          this.snackBar.open("Registration Successfull.",'😜',{
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
          });
          this.route.navigate([""])

        },
        error: error => {
          this.snackBar.open(error.error.message,'😜',{
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
          });
        }
      })
    }
  }

  closeChat(){
    this.openChat = false;
  }

}