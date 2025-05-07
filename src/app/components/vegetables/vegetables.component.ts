import { Component } from '@angular/core';
import {NgForOf} from '@angular/common';
import {ProductCardComponent} from '@components/product-card/product-card.component';
import {Product} from '@models/product.interface';
import {ProductService} from '@services/product/product.service';
import {OnInit} from '@angular/core';
import {Button} from 'primeng/button';

@Component({
  selector: 'app-vegetables',
  imports: [
    NgForOf,
    ProductCardComponent,
    Button
  ],
  templateUrl: './vegetables.component.html',
})
export class VegetablesComponent implements OnInit {
  products: Product[] = [];
  filteredProducts : Product[] = [];
  portugueseProducts: Product[] = [];
  organicProducts: Product[] = [];
  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getAllVegetables().subscribe((data: Product[]) => {
      this.products = data;
      this.filteredProducts = data;
      this.portugueseProducts = data.filter((fruit) => fruit.countryOfOrigin.toLowerCase() === 'portugal');
      this.organicProducts = data.filter((fruit) => fruit.sustainability.organic);
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
