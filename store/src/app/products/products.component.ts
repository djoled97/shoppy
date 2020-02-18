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
  display: any = {};
  name:any
  searched:boolean=false;
  constructor(private db: AngularFirestore,
    
    private productService: ProductService,private afAuth:AngularFireAuth,private auth:AuthService) {
    this.auth.setSessionStorage();
   
  }


  ngOnInit() {
      
    document.body.classList.add('bg-img2');
    this.productService.getProduct().subscribe(products => {
      this.products = products
      
    });
  }

  submit(id: string,name:string,price:number) {
    this.productService.addToCart(id,name,price);
  
    alert("Item added to your cart");
  }
  search(){
      
    this.products=[];
    this.productService.search(this.name,this.products);
    
    return this.searched=true;
  }
  

}

