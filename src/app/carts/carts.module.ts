import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './components/cart/cart.component';



@NgModule({
    declarations: [
        CartComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
    ]
})
export class CartsModule { }
