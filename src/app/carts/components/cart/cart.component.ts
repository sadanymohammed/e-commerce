import { CartsService } from './../../services/carts.service';
import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  animations: [
    trigger('fadeOut', [
      transition(':leave', [
        style({ opacity: 1 }),
        animate('400ms', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class CartComponent implements OnInit {
  cartProds: any[] = [];
  total: any = 0;
  success: boolean = false;
  number: number = 0;


  constructor(private service: CartsService) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getCartProducts();
  }

  getCartProducts() {
    if ('cart' in localStorage) {
      this.cartProds = JSON.parse(localStorage.getItem('cart')!);
    }
    this.getTotalPrice();
  }

  addAmount(i: number) {
    this.cartProds[i].quantity++;
    this.getTotalPrice();
    localStorage.setItem('cart', JSON.stringify(this.cartProds));
  }

  minAmount(i: number) {
    if (this.cartProds[i].quantity > 1) {
      this.cartProds[i].quantity--;
    }
    this.getTotalPrice();
    localStorage.setItem('cart', JSON.stringify(this.cartProds));
  }


  detectChange() {
    this.getTotalPrice();
    localStorage.setItem('cart', JSON.stringify(this.cartProds));
  }

  onDelete(i: number) {
    this.cartProds.splice(i, 1);
    this.getTotalPrice();

    localStorage.setItem('cart', JSON.stringify(this.cartProds));
  }

  onClearAll() {
    this.cartProds = [];
    this.getTotalPrice();
    localStorage.setItem('cart', JSON.stringify(this.cartProds));
  }

  getTotalPrice() {
    this.total = 0;
    for (let x in this.cartProds) {
      this.total += this.cartProds[x].item.price * this.cartProds[x].quantity;
    }
  }

  addCart() {
    let prods = this.cartProds.map(item=>{
      return{productId:item.item.id, quantity:item.item.quantity}
    })
    let model={
      userId:5,
      date: new Date(),
       products: prods
    }
    this.service.createNewCart(model).subscribe(res=>{
      this.success = true;
    })
  }


  //................................................................................................

}
