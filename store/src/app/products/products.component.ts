import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { ProductService } from '../service/product.service';
import { Product } from '../models/Product';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[];
  num:number;
  


  constructor(db: AngularFirestore,
    private productService: ProductService,private afAuth:AngularFireAuth,private auth:AuthService) {
    this.auth.setSessionStorage();
  }

  ngOnInit() {
    
    this.productService.getProduct().subscribe(products => {
      this.products = products
    });
  }

  submit(id: string,name:string,price:number) {
    this.productService.addToCart(id,name,price);
    console.log(this.num);
    alert("Item added to your cart");
  }
}

