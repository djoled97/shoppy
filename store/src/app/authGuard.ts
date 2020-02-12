import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './service/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

    
    


    constructor(private router: Router
        , private authService: AuthService) {
            
        }

    canActivate() {
      
        if (this.authService.isAuthenticated()) {
            
            return true 
           
        }

        
        this.router.navigate(['./signin']);
        return false;} 
    }


