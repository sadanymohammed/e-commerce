import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../service/products.service';

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.css'],
})
export class ProductsDetailsComponent implements OnInit {
  id: any;
  loading:boolean = false;
  @Input() data: any = {};

  constructor(private route: ActivatedRoute, private service: ProductsService) {
    this.id = this.route.snapshot.paramMap.get('id');

  }

  ngOnInit(): void {
    this.getProduct()
  }

  getProduct(){
    this.loading = true;
    this.service.getProdId(this.id).subscribe(res => {
      this.loading = false;
      this.data = res;

    },err => {
      this.loading = false;
      alert("Product not found");
    })
  }


}
