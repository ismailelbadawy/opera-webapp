import { Injectable } from "@angular/core";
import { Router, CanActivate, ActivatedRouteSnapshot, CanActivateChild, RouterStateSnapshot } from '@angular/router';


@Injectable({
    providedIn : 'root'
})
export class AuthGuard implements CanActivate 
{
    canActivate() : boolean {
        return localStorage.getItem('user') != null;
    }

    redirectApp() {
        this._router.navigate(
            ['login']
        );
    }

    constructor(private _router : Router) {

    }
}