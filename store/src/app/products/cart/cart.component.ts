import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';
import { Cart } from 'src/app/models/Cart';
import { CartService } from 'src/app/service/cart.service';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AuthService } from 'src/app/service/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  carts: Cart[];
  user = this.afAuth.auth.currentUser;
  mainUser: AngularFirestoreDocument;
  sub: any;
  name: any;
  lastName: any;
  display:boolean=true;
  
  constructor(private cartService: CartService, private db: AngularFirestore, private auth: AuthService, private afAuth: AngularFireAuth) {
    this.auth.getUserState().subscribe(user => {
      this.user = user
      
    })
    
 
  }

  ngOnInit() {
    this.cartService.getCart().subscribe(cart => {
      this.carts = cart;
      this.mainUser = this.db.doc(`Users/${this.user.uid}`);
      this.sub = this.mainUser.valueChanges().subscribe(event => {
        this.name = event.firstname,
          this.lastName = event.lastname  
    });
             
      })
    
    
  }
  delete(id: string) {
    if (confirm("This will remove your item from cart")) {
      this.cartService.deleteFromCart(id);
      
      
    }

  }
  buy() {
    this.display=false;
    this.cartService.moveToHistory( this.lastName);
    this.cartService.deleteCart();
    alert("Your order is complete")
    

  }

}
