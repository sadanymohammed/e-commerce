import { CollectionsComponent } from './products/components/collection/collection.component';
import { NewArival } from './products/components/new-arival/new-arival';
import { FormsModule } from '@angular/forms';
import { ProductsDetailsComponent } from './products/components/products-details/products-details.component';
import { AllProductsComponent } from './products/components/all-products/all-products.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './carts/components/cart/cart.component';

const routes: Routes = [
  {path: 'products', component:AllProductsComponent},
  {path: 'details/:id', component:ProductsDetailsComponent},
  {path: 'cart', component:CartComponent},
  {path: 'pages', component: NewArival},
  {path: 'collection', component: CollectionsComponent},
  {path: '**', redirectTo: 'products', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes), FormsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
