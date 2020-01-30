import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-reset-pass',
  templateUrl: './reset-pass.component.html',
  styleUrls: ['./reset-pass.component.css']
})
export class ResetPassComponent implements OnInit {
  email:string;
  constructor(private auth:AuthService) { }

  ngOnInit() {
  }
  submit(){
    this.auth.resetPass(this.email);
  
  }
}
