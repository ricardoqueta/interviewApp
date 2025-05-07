import { Component,OnInit } from '@angular/core';
import {CartService} from '@services/cart/cart.service';
import {CartItem} from '@models/cart.interface';
import {CurrencyPipe, NgForOf} from '@angular/common';
import {Drawer} from 'primeng/drawer';
import {Button} from 'primeng/button';
import {Card} from 'primeng/card';
import {Router} from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [
    NgForOf,
    CurrencyPipe,
    Drawer,
    Button,
    Card
  ],
  templateUrl: './cart.component.html',
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  cartCount: number = 0;
  cartTotal: number = 0;
  visible: boolean = false;

  constructor(private router:Router ,private cartService: CartService) {
  }

  ngOnInit(): void {
    this.cartService.getCart().subscribe((cart) => {
      this.cartItems = cart;
      this.cartCount = cart.length;
      this.cartTotal = cart.reduce((acc, item) => acc + item.priceByUnit * item.quantity, 0);
    });
  }

  clearCart() {
    this.cartService.clearCart();
  }

  clearItem(cartItem: CartItem) {
    this.cartService.clearItem(cartItem);
  }

  viewItem(cartItem: CartItem) {
    this.visible = false;
    this.router.navigate(['products', cartItem.type, cartItem.id])
  }

  goToCheckOut () {
    this.visible = false;
    this.router.navigate(['checkout'])
  }
}
