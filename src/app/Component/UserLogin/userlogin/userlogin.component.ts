import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTabGroup } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { GaurdAuthService } from 'src/app/Service/GaurdAuth/gaurd-auth.service';
import { UserAuthService } from 'src/app/Service/UserAuth/user-auth.service';
import { SnackbarServiceService } from 'src/app/Service/snackBarService/snackbar-service.service';
import { ForgotPasswordComponent } from '../../ForgotPassword/forgot-password/forgot-password.component';

@Component({
  selector: 'app-userlogin',
  templateUrl: './userlogin.component.html',
  styleUrls: ['./userlogin.component.css']
})
export class UserloginComponent {
  @ViewChild(MatTabGroup) tabGroup!: MatTabGroup ;
  hide = true;

  loginForm!: FormGroup;
  SignupForm!:FormGroup;
  constructor(private fb: FormBuilder,
    public dialog: MatDialog,
        private router: Router,
    private _coreService: SnackbarServiceService,
    private userauthservice: UserAuthService,
    private gaurdService :GaurdAuthService
  ){
    this.loginForm = this.fb.group(
      {
        email:  ['', Validators.compose([Validators.required, Validators.email, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/)])],
        password: ['', Validators.required]
      }),
      this.SignupForm=this.fb.group({
        email:  ['', Validators.compose([Validators.required, Validators.email,Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/)])],
        password: ['', Validators.required]
      })
  }



  onLogin(){
    if(this.loginForm.valid)
    {
      this.gaurdService.login(this.loginForm.value)
    }
    else{
      //alert("Invalid");
      //this._coreService.openSnackBar("invalid input")
    }
  }
  onSignup(){
    if(this.SignupForm.valid){
      this.userauthservice.postData(this.SignupForm.value).subscribe(res=>{
        this._coreService.openSnackBar('User Register successfully')
        this.SignupForm.reset();
        this.tabGroup.selectedIndex = 0;
      })
    }
  }



  SendForgetLink(){
    const dialogRef = this.dialog.open(ForgotPasswordComponent, {
      width: '500px',
      autoFocus: false,
      backdropClass: 'dialog-backdrop',
      position: {
        top: '10px',
        left: '35%'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log('Email: ', result);
    });
  }

  switchTab(){
    this.tabGroup.selectedIndex = 0;
  }
}
