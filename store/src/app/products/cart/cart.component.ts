import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';
import { Cart } from 'src/app/models/Cart';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  carts:Cart[];
  constructor( private cartService :CartService) { 
    
  }

  ngOnInit() {
    this.cartService.getCart().subscribe(cart=>{
      this.carts=cart;
     
    });
  }
   delete(id:string){
    if(confirm("This will remove your item from cart")) {
      this.cartService.deleteFromCart(id);
    }
    
   }
   buy(){
     
   }

  }
