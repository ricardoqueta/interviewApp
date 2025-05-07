import { Injectable } from '@angular/core';
import {Product} from '@models/product.interface';
import {Observable, of} from 'rxjs';
import {productsList} from './data';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products: Product[] = productsList;

  constructor() { }

  getAllVegetables(): Observable<Product[]> {
    const vegetables = this.products.filter(fruit => fruit.type === 'vegetable');
    return of(vegetables);
  }

  getAllFruits(): Observable<Product[]> {
    const fruits = this.products.filter(fruit => fruit.type === 'fruit');
    return of(fruits);
  }

  getAllSaleProducts(): Observable<Product[]> {
    const saleProducts = this.products.filter(fruit => fruit.salePriceByUnit !== null);
    return of(saleProducts);
  }

  getById(id: number): Observable<Product | undefined> {
    return of(this.products.find(fruit => fruit.id === id));
  }
}
