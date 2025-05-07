import { Component } from '@angular/core';
import {Product} from '@models/product.interface';
import {ProductService} from '@services/product/product.service';
import {NgForOf} from '@angular/common';
import {OnInit} from '@angular/core';
import {ProductCardComponent} from '@components/product-card/product-card.component';

@Component({
  selector: 'app-sale',
  imports: [
    NgForOf,
    ProductCardComponent
  ],
  templateUrl: './sale.component.html',
})
export class SaleComponent implements OnInit {
  products: Product[] = [];
  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getAllSaleProducts().subscribe((data: Product[]) => {
      this.products = data;
    });
  }
}
