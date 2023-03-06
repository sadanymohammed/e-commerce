import { CollectionsComponent } from './components/collection/collection.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllProductsComponent } from './components/all-products/all-products.component';
import { ProductsDetailsComponent } from './components/products-details/products-details.component';
import { ProdComponent } from './components/prod/prod.component';
import { SharedModule } from '../shared/shared.module';
import { StatsComponent } from './components/stats/stats.component';
import { HeroComponent } from './components/hero/hero.component';



@NgModule({
    declarations: [
        AllProductsComponent,
        ProductsDetailsComponent,
        ProdComponent,
        HeroComponent,
        StatsComponent,
        CollectionsComponent
    ],
    imports: [
      CommonModule,
      SharedModule,
      RouterModule,
      FormsModule,

    ]
})
export class ProductsModule { }
