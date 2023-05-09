import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ForgotPasswordServiceService } from 'src/app/Service/ForgotPasswordService/forgot-password-service.service';
import { SnackbarServiceService } from 'src/app/Service/snackBarService/snackbar-service.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {

  email!: string;
  constructor(
    public dialogRef: MatDialogRef<ForgotPasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private passwordservice:ForgotPasswordServiceService,
    private coreService:SnackbarServiceService
    )
    {}
  ngOnInit(): void {
  }
    onNoClick(){
      this.dialogRef.close();
    }
    forgotPassword(){
      console.log(this.email)
        this.passwordservice.forgotpassword(this.email).subscribe(res=>
          {
            localStorage.setItem('resetemail',res.email);
            localStorage.setItem('resettoken',res.resetToken);
          });
        this.coreService.openSnackBar("Email reset link successfully sent. Please check your mail.")
          this.dialogRef.close();
    }
}
