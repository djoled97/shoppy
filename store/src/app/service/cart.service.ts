import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Cart } from '../models/Cart';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartCollection:AngularFirestoreCollection<Cart>
    cart:Observable<Cart[]>;
  constructor(private db:AngularFirestore) {
   
    this.cart = this.db.collection('cart').snapshotChanges().pipe(map(changes => {
      return changes.map(a=>{
        const data = a.payload.doc.data() as Cart
        data.id = a.payload.doc.id;
        
        return data;
      });
    }));

  


}
getCart(){
  return this.cart;
}
deleteFromCart(id:string){
  this.db.collection('cart').doc(id).delete().then(function() {
    console.log("Document successfully deleted!");
}).catch(function(error) {
    console.error("Error removing document: ", error);
});
}
order(){
//   db.collection("cities").get().then(function(querySnapshot) {
//     querySnapshot.forEach(function(doc) {
//         // doc.data() is never undefined for query doc snapshots
//         console.log(doc.id, " => ", doc.data());
//     });
// });
  
// }

}}