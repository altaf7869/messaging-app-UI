import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserAuthService } from '../Service/UserAuth/user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class MyguardGuard implements CanActivate {

constructor(private userAuth:UserAuthService){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean{
      if(sessionStorage.getItem("token")==null){
        return false
      }
      else{
        return true
      }
    }

}
