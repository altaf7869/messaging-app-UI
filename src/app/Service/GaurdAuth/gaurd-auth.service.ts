import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserAuthService } from '../UserAuth/user-auth.service';
@Injectable({
  providedIn: 'root'
})
export class GaurdAuthService {

  constructor(private userauthservice:UserAuthService,
    private router:Router,
    private snackBar: MatSnackBar,) { }
  getToken(){
    return sessionStorage.getItem("token")
  }
  logout(){
    sessionStorage.removeItem("token")
    this.router.navigate([""])
  }
  login(value:any):Observable<any>{
    this.userauthservice.login(value).subscribe((r)=>{
      sessionStorage.setItem("token",r.token)
      sessionStorage.setItem("id",r.id)
      this.snackBar.open(r.message,'',{
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
      });

    }) //need to change
      return <any>("login succed")
  }
  isLogin(): boolean {
    const token = sessionStorage.getItem("token");
    return !!token; // Returns true if token is present, false otherwise
  }
}

