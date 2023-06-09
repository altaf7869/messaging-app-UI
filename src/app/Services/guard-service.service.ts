import { Injectable } from '@angular/core';
import { UserauthService } from '../Services/userauth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class GuardServiceService {

  constructor(private userauthservice:UserauthService,
    private router:Router,
    private snackBar: MatSnackBar,) { }
  getToken(){
    return localStorage.getItem("token")
  }
  logout(){
    localStorage.removeItem("token")
    this.router.navigate([""])
  }
  // login(value:any):Observable<any>{
  //   this.userauthservice.login(value).subscribe({
  //     next: (r)=> {
  //       localStorage.setItem("token",r.token)
  //       localStorage.setItem("id",r.id)
  //      // localStorage.setItem("userName",r.firstName)
  //       this.snackBar.open(r.message,'😜',{
  //         duration: 3000,
  //         horizontalPosition: 'end',
  //         verticalPosition: 'top',
  //       });
  //       //this.router.navigate(["chat"])
  //     }, 
  //     error: error => {
  //       this.snackBar.open(error.error.message,'😜',{
  //         duration: 3000,
  //         horizontalPosition: 'end',
  //         verticalPosition: 'top',
  //       });
  //     }
  //   })
  //     return <any>("login succed")
  // }
  isLogin(): boolean {
    const token = localStorage.getItem("token");
    return !!token; // Returns true if token is present, false otherwise
  }
}