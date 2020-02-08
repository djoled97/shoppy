import { Component, OnInit } from '@angular/core';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { resolve } from 'url';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  mainUser: AngularFirestoreDocument
  user = this.afAuth.auth.currentUser;
  date: any;
  sub: any;
  lastName: any;
  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.mainUser = this.db.doc(`Users/${user.uid}`);
        this.sub = this.mainUser.valueChanges().subscribe(event => {

          this.lastName = event.lastname
          
     })
      }
    }
    )
   }
  
  ngOnInit() {
  
    let snap = this.db.collection(`history${this.lastName}`);
    const documents = []
    snap.get().forEach(element => {
      
    });

  
  }
}