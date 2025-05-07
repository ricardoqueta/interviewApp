import { Component,OnInit } from '@angular/core';
import {ProductCardComponent} from '@components/product-card/product-card.component';
import {Product} from '@models/product.interface';
import {NgForOf} from '@angular/common';
import {ProductService} from '@services/product/product.service';
import {Button} from 'primeng/button';

@Component({
  selector: 'app-product',
  imports: [
    ProductCardComponent,
    NgForOf,
    Button
  ],
  templateUrl: './fruits.component.html',
})
export class FruitsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts : Product[] = [];
  portugueseProducts: Product[] = [];
  organicProducts: Product[] = [];
  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getAllFruits().subscribe((data: Product[]) => {
      this.portugueseProducts = data.filter((fruit) => fruit.countryOfOrigin === 'Portugal');
      this.organicProducts = data.filter((fruit) => fruit.sustainability.organic);
      this.products = data;
      this.filteredProducts = data;
    });
  }

  filterPortugueseProducts() {
    this.filteredProducts = this.portugueseProducts;
  }

  filterOrganicProducts() {
    this.filteredProducts = this.organicProducts;
  }

  clearFilter() {
    this.filteredProducts = this.products;
  }
}
