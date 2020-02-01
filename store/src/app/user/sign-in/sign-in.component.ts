import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from "../../service/auth.service";
import { AppComponent } from 'src/app/app.component';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  loggedIn: boolean;
  
  authError: any;

  constructor(private auth: AuthService) { 
   
  }

  ngOnInit() {
    this.auth.eventAuthError$.subscribe( data => {
      this.authError = data;
      
    });
  }

  login(frm) {
    
    
    this.auth.login(frm.value.email, frm.value.password)
    
    
  }
}
