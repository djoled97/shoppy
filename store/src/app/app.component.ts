import { Component } from '@angular/core';
import { AuthService } from "../app/service/auth.service";
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'store';

 user=this.afAuth.auth.currentUser;
  constructor( private auth:AuthService, private router: Router, private afAuth: AngularFireAuth ){
    
      this.auth.getUserState().subscribe(user =>{
        this.user=user;
      })  
  }
    
  logout(){
    if(confirm("Are you sure you want to log out?"))
    this.auth.logout();
    
  // }
  //  signin(){
     
  //  }
}}
