import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, pipe } from 'rxjs';
import { Cart } from '../models/Cart';
import { map } from 'rxjs/operators';
import { firestore } from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { templateJitUrl } from '@angular/compiler';
  
@Injectable({
  providedIn: 'root'
})

export class CartService {
  cartCollection: AngularFirestoreCollection<Cart>
  cart: Observable<Cart[]>;
  price: any[];
  name: any[];
  num=null;
  authUser = this.afAuth.auth.currentUser;
  date: any;
  constructor(private db: AngularFirestore, private afAuth: AngularFireAuth) {
    
    this.cart = this.db.collection('cart').snapshotChanges().pipe(map(changes => {
     
      return changes.map(a => {
        const data = a.payload.doc.data() as Cart
        data.price = a.payload.doc.get('price');
        data.id = a.payload.doc.id;

        return data;
      });
    }));




  }
  getCart() {
    return this.cart;
  }
  deleteFromCart(id: string) {
    this.db.collection('cart').doc(id).delete().then(function () {
      console.log("Document successfully deleted!");
    }).catch(function (error) {
      console.error("Error removing document: ", error);
    });
  }
  order() {
    //   db.collection("cities").get().then(function(querySnapshot) {
    //     querySnapshot.forEach(function(doc) {
    //         // doc.data() is never undefined for query doc snapshots
    //         console.log(doc.id, " => ", doc.data());
    //     });
    // });

    // }

  }
  deleteCart() {
    this.db.collection('cart').get().toPromise().then(res => {
      res.forEach(element => {
        element.ref.delete();
      })
    })
  }

  moveToHistory(id: string, name: string) {
    { this.db.collection('cart').get().toPromise().then(res => {
      res.forEach(element => {
        
         this.date=new Date().toString()
        this.price = [element.get('price')];
        this.name = [element.get('name')];
        
          this.db.collection(`history${name}`).doc(this.date).set({
            date: new Date(),
            name: this.price,
            price: [element.get('price')],
            status: 'completed'
          })
      })

    })}
   


  }

}
