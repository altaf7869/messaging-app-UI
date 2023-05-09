import { Component,ViewChild  } from '@angular/core';
import { ForgotPasswordComponent } from '../../ForgotPassword/forgot-password/forgot-password.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SnackbarServiceService } from 'src/app/Service/snackBarService/snackbar-service.service';
import { UserAuthService } from 'src/app/Service/UserAuth/user-auth.service';
import { GaurdAuthService } from 'src/app/Service/GaurdAuth/gaurd-auth.service';
import ValidateForm from 'src/app/Helper/ValidateForm';
import { MatTabGroup } from '@angular/material/tabs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @ViewChild(MatTabGroup) tabGroup!: MatTabGroup ;
  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  public loginForm!: FormGroup;
  resetPasswordEmail!:string;
  public isValidEmail!: boolean;
  signUpForm!: FormGroup;
  // toast: any;
  constructor(private fb: FormBuilder,
    public dialog: MatDialog,
        private router: Router,
    private _coreService: SnackbarServiceService,
    private userauthservice: UserAuthService,
    private gaurdService :GaurdAuthService
  ) {
  }
  ngOnInit(): void {
    this.loginForm = this.fb.group(
      {
        email:  ['', Validators.compose([Validators.required, Validators.email])],
        password: ['', Validators.required]
      }
    )
    this.signUpForm = this.fb.group(
      {
        //firstName : ['', Validators.required],
        //lastName : ['', Validators.required],
        email:  ['', Validators.compose([Validators.required, Validators.email])],
        //username : ['', Validators.required],
        password: ['', Validators.required],
      }
    )
  }
  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }

  singup() {
    if (this.signUpForm.valid) {
      this.userauthservice.postData(this.signUpForm.value).subscribe({
        next: (val: any) => {
          this._coreService.openSnackBar('User Register successfully')
        console.log(val,)
        this.signUpForm.reset();
        this.tabGroup.selectedIndex = 0;
        },
        error: (err: any) => {
          console.error(err);
          this._coreService.openSnackBar(err.error);
        }
      })
    } else {
      ValidateForm.validateAllFormFields(this.signUpForm);
      this._coreService.openSnackBar('Your form is invalid')
    }
  }
  onLogin()
  {
    if(this.loginForm.valid)
    {
      console.log(this.loginForm.value);
       // Send the object to db
      this.gaurdService.login(this.loginForm.value)
    }
  }
    checkValidEmail(event: string)
    {
      const value = event;
      const pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,3}$/;
      this.isValidEmail = pattern.test(value);
      return this.isValidEmail;
    }
    openEmailDialog(): void {
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

    SwitchLogin(){
      this.tabGroup.selectedIndex = 0;
    }
  }
