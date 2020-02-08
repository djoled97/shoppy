import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminUsersComponent } from './admin/admin-users/admin-users.component';
import { ProductsComponent } from './products/products.component';
import { CartComponent } from './products/cart/cart.component';
import { UserComponent } from './user/user.component';
import { SignInComponent } from '../app/user/sign-in/sign-in.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { environment } from "../environments/environment";
import { AngularFireModule } from '@angular/fire';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import {FormsModule } from "@angular/forms";
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AuthService } from './service/auth.service';
import { ProductService } from './service/product.service';
import { ProfileComponent } from './profile/profile.component';
import { ResetPassComponent } from './reset-pass/reset-pass.component';
import { AuthGuard } from './authGuard';
import { HistoryComponent } from './history/history.component';
@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    AdminProductsComponent,
    AdminUsersComponent,
    ProductsComponent,
    CartComponent,
    UserComponent,
    SignInComponent,
    SignUpComponent,
    ProfileComponent,
    ResetPassComponent,
    HistoryComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    FormsModule
    
    
  ],
  providers: [AuthService,ProductService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
