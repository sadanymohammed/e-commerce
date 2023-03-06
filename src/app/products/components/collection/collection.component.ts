import { Component, OnInit } from '@angular/core';
interface Product {
  category: string;
  title: string;
  url: 'url';

}

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss'],
})
export class CollectionsComponent implements OnInit {
  categoriesProducts: any;
  loadmore: any;
  constructor() {}

  products: Product[] = [];
  currentIndex = 0;
  maxResult = 8;

  async ngOnInit() {
    this.products = await this.getProducts();
  }

  async getProducts(): Promise<Product[]> {
    const results = await fetch('assets/data/products.json');
    const data = await results.json();
    const products = data.products;
    return products;
  }


}
