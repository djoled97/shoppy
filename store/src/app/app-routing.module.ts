import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { SignUpComponent } from '../app/user/sign-up/sign-up.component';
import { ProductsComponent } from './products/products.component';
import { CartComponent } from './products/cart/cart.component';
import { AdminComponent } from './admin/admin.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminUsersComponent } from './admin/admin-users/admin-users.component';
import { ProfileComponent } from './profile/profile.component';
import { ResetPassComponent } from './reset-pass/reset-pass.component';


const routes: Routes = [
  { path: '', component: SignInComponent},
   {path:'profile',component:ProfileComponent},
       {path:'resetpass',component:ResetPassComponent},
         
         { path: 'signin', component: SignInComponent},
         { path: 'signup', component: SignUpComponent},
       
   
   { path: 'products', component: ProductsComponent,
  },
         { path: 'cart', component: CartComponent }   ,  
   
 
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
