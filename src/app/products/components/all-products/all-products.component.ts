import { prod } from './../../models/prods';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../service/products.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss'],
})

export class AllProductsComponent implements OnInit {
  products: prod[] = [];
  categories: string[] = [];
  cartProducts: any[] = [];
  spinner: boolean = false;

  constructor(private service: ProductsService) {}

  getProducts() {
    this.spinner = true;
    this.service.getAllProducts().subscribe(
      (res: any) =>  {
        this.products = res;
        this.spinner = false;
      },
      (err) => {
        this.spinner = false;
        alert('ERROR: Could not get products');
      }
    );
  }

  getCategories() {
    this.spinner = true;
    this.service.getAllCategories().subscribe(
      (res: any) => {
        this.categories = res;
        this.spinner = false;
      },
      (err) => {
        this.spinner = false;
        alert('ERROR: Could not get products');
      }
    );
  }

  onCategory(event: any) {
    let value = event.target.value;
    if (value == 'all') {
      this.getProducts();
    } else {
      this.getFiltered(value);
    }
  }

  getFiltered(keyword: string) {
    this.spinner = true;

    this.service.getFilterdProd(keyword).subscribe((res: any) => {
      this.spinner = false;
      this.products = res;
    });
  }

  addToCart(event: any) {
    if ('cart' in localStorage) {
      this.cartProducts = JSON.parse(localStorage.getItem('cart')!);
      let exist = this.cartProducts.find((item) => item.item.id == event.item.id);
      if (exist) {
        alert('Product is already added');
      } else {
        this.cartProducts.push(event);
        localStorage.setItem('cart', JSON.stringify(this.cartProducts));
      }
    } else {
      this.cartProducts.push(event);
      localStorage.setItem('cart', JSON.stringify(this.cartProducts));
    }
  }

  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
  }
}
