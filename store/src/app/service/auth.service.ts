
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { ThrowStmt } from '@angular/compiler';
import { BehaviorSubject, Observable, pipe } from 'rxjs';
import { User } from '../models/User';
import { map } from 'rxjs/operators';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private eventAuthError = new BehaviorSubject<string>("");
  eventAuthError$ = this.eventAuthError.asObservable();

  newUser: any;

  user: Observable<User[]>;
  constructor(
    private cartService:CartService,
    private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router) {
    this.user = this.db.collection('Users').snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as User
        data.id = a.payload.doc.id;

        return data;
      });
    }));

  }

  getUserState() {
    return this.afAuth.authState;
  }

  login(email: string, password: string) {
      
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .catch(error => {
        this.eventAuthError.next(error);
        
      })
      .then(userCredential => {
        if (userCredential) {
            this.setSessionStorage();
          
          


        }
      })
      
      
  }
  getUser() {
    return this.user;
  }
  createUser(user) {
    console.log(user);
    this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password)
      .then(userCredential => {
        this.newUser = user;
        // console.log(userCredential);
        userCredential.user.updateProfile({
          displayName: user.firstName + ' ' + user.lastName
        });

        this.insertUserData(userCredential)
          .then(() => {
            this.router.navigate(['/signin']);
          });
      })
      .catch(error => {
        this.eventAuthError.next(error);
      });
  }

  insertUserData(userCredential: firebase.auth.UserCredential) {
    return this.db.doc(`Users/${userCredential.user.uid}`).set({
      email: this.newUser.email,
      firstname: this.newUser.firstName,
      lastname: this.newUser.lastName,
      phone: this.newUser.phone,
      address: this.newUser.address,
      role: 'network user'
      
    })
  }

  logout() {
    
  
    return this.afAuth.auth.signOut();

  }
  // getUser(id:string){
  //   return this.db.collection('Users').doc(id);
  // }

  resetPass(email: string) {
    let auth = this.afAuth.auth;


    auth.sendPasswordResetEmail(email).then(function () {
      alert('An email to reset your password has been sent!')
    }).catch(function (error) {
      console.log(error);
    });
  }
  isAuthenticated() {
      
    
    let token = sessionStorage.getItem('key');
    if (token) {
     
      return true;
      
    } else {
      return false;
    }
  }

  setSessionStorage() {
    this.afAuth.auth.onAuthStateChanged(function (user) {
      if (user) {
        user.getIdToken().then(function (data) {
         
          sessionStorage.setItem('key', data);
          
        });
      }

    });
   
  }
}
