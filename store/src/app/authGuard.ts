import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './service/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

    
    


    constructor(private router: Router
        , private authService: AuthService) {
            
        }

    canActivate() {
        // Check to see if a user has a valid token
        if (this.authService.isAuthenticated()) {
            
            return true;
           
        }

        // If not, they redirect them to the login page
        this.router.navigate(['./signin']);
        return false;}
    }


