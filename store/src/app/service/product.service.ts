import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Product } from '../models/Product';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
    productCollection:AngularFirestoreCollection<Product>
    products:Observable<Product[]>;
    num=0;
    constructor(private db:AngularFirestore) {
        this.products = this.db.collection('items').snapshotChanges().pipe(map(changes => {
            return changes.map(a=>{
              const data = a.payload.doc.data() as Product
              data.id = a.payload.doc.id;
              return data;
            });
          }));
        }
        getProduct(){
            return this.products;
        }
        addItem(product: Product){
            this.productCollection.add(product);
          }
          getCart(){
            return this.db.collection('items');
          }
          addToCart(id:string,name:string,price:number){
            return this.db.collection('cart').doc(id).set({
              name:name,
              price:price,
              num:this.num++
            });
          }
         
       


        }

    



