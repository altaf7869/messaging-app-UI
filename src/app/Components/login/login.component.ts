import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UserauthService } from 'src/app/Services/userauth.service';
import { GuardServiceService } from 'src/app/Services/guard-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  Logindata!: FormGroup;
  hide = true;
  openChat = false;

  constructor(private formBuilder: FormBuilder,
    private route: Router,
    private guardService:GuardServiceService,private userauthService:UserauthService,
    public dialog: MatDialog, private snackbar:MatSnackBar) {

    this.Logindata = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6),
      ])],
    })
  }

  onSubmit(){
    if (this.Logindata.valid) {
    this.userauthService.login(this.Logindata.value).subscribe({
      next: (r)=> {
        sessionStorage.setItem("token",r.token)
        sessionStorage.setItem("id",r.id)

        this.snackbar.open(r.message,'😜',{
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
        });
        this.route.navigate(["chat"])
      }, 
      error: error => {
        console.log(error.error)
        this.snackbar.open(error.error,'😜',{
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

  registration() {
    this.route.navigate(["register"])
  }
  // openEmailDialog(): void {
  //   const dialogRef = this.dialog.open(ForgotPasswordComponent, {
  //     width: '700px',
  //     autoFocus: false,
  //     backdropClass: 'dialog-backdrop',
  //     position: {
  //       top: '10px',
  //       left: '30%'
  //     }

  //   });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    //   console.log('Email: ', result);
    // });
  //}
}