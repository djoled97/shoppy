import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../models/User';
import { AuthService } from '../service/auth.service';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
  
export class ProfileComponent implements OnInit {
  authUser=this.afAuth.auth.currentUser;
 name:string;
 lastName:string;
 phone:string;
 address:string;
email:string;
 mainUser:AngularFirestoreDocument;
 sub:any;
  constructor(private afAuth: AngularFireAuth,private auth:AuthService,private db:AngularFirestore,private router:Router) { 
    this.mainUser = db.doc(`Users/${this.authUser.uid}`);
    this.sub = this.mainUser.valueChanges().subscribe(event => {
      this.name = event.firstname,
      this.lastName = event.lastname,
      this.phone = event.phone,
      this.address=event.address,
      this.email=event.email;
    })
  }



  ngOnInit() {
    // if(this.authUser!=null){
    // this.name=this.authUser.displayName;
     
    
     
    // }

  }
  submit(){
    
    
    return  this.mainUser.update({
      firstname:this.name,
      lastname:this.lastName,
      phone:this.phone,
      address:this.address,
      email:this.email
      
    }
    
    ).then(()=>{
      this.authUser.updateEmail(this.email);
      // location.reload();
    })
    
    }
  }

