import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import { CartItem } from '@models/cart.interface';



@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart :BehaviorSubject<CartItem[]>  = new BehaviorSubject<CartItem[]>([]);

  constructor() { }


  getCart(): BehaviorSubject<CartItem[]> {
    return this.cart;
  }

  addToCart(item: CartItem): void {
    const currentCart = this.cart.getValue();
    const existingItemIndex = currentCart.findIndex(cartItem => cartItem.id === item.id);

    if (existingItemIndex > -1) {
      currentCart[existingItemIndex].quantity += item.quantity;
    } else {
      currentCart.push(item);
    }

    this.cart.next(currentCart);
  }

  clearCart(): void {
    this.cart.next([]);
  }

  clearItem (cartItem: CartItem): void {
    const currentCart = this.cart.getValue();
    const updatedCart = currentCart.filter(item => item.id !== cartItem.id);
    this.cart.next(updatedCart);
  }
}
