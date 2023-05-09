import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ForgotPasswordServiceService } from 'src/app/Service/ForgotPasswordService/forgot-password-service.service';
import { SnackbarServiceService } from 'src/app/Service/snackBarService/snackbar-service.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {

  passwordForm!: FormGroup;
  constructor(private fb: FormBuilder,
     private passwordservice:ForgotPasswordServiceService,
     private routes:Router,
     private snackbar :SnackbarServiceService) { }
  ngOnInit(): void {
    this.passwordForm = this.fb.group({
      newPassword: ['', Validators.compose([ Validators.required, Validators.minLength(6),
        // Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$')
      ])],
      confirmPassword: ['', Validators.required],
      email:localStorage.getItem("resetemail"),
      emailToken:localStorage.getItem('resettoken')
    })
  }
  onSubmit(): void {
    if (this.passwordForm.valid) {
      this.passwordservice.ResetPassword(this.passwordForm.value).subscribe(res=>
        {
        this.snackbar.openSnackBar(res)
        this.routes.navigate([""])
        }
        
        )
      console.log(this.passwordForm.value);
    }
  }
}
