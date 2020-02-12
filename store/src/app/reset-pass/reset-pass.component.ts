import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { NgxSpinnerService } from 'ngx-spinner'

@Component({
  selector: 'app-reset-pass',
  templateUrl: './reset-pass.component.html',
  styleUrls: ['./reset-pass.component.css']
})
export class ResetPassComponent implements OnInit {
  email:string;
  constructor(private auth:AuthService,private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 1000); 
  }
  submit(){
   
    this.auth.resetPass(this.email);
  
  }
}
