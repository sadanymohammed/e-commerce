import { prod } from './../../models/prods';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-prod',
  templateUrl: './prod.component.html',
  styleUrls: ['./prod.component.scss'],
})
export class ProdComponent implements OnInit {
  @Input() data!: prod
  @Output() item = new EventEmitter();
  addBtn: boolean = false;
  amount: number = 0;

  add() {
    this.item.emit({item:this.data, quantity: this.amount});
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }
}
