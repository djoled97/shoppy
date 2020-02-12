import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../service/auth.service";
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  authError: any;

  constructor(private auth: AuthService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    document.body.classList.add('bg-img2');
    this.auth.eventAuthError$.subscribe(data => {
      this.authError = data;

    })
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 1000); 
  
  }

  createUser(frm) {
    this.auth.createUser(frm.value);
  }

}
