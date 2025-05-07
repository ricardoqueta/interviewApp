import {Component, OnInit} from '@angular/core';
import {CartService} from '@services/cart/cart.service';
import {CartItem} from '@models/cart.interface';
import {TableModule} from 'primeng/table';
import {CurrencyPipe, NgForOf} from '@angular/common';
import {Button} from 'primeng/button';
import {Router} from '@angular/router';
import {Toast} from 'primeng/toast';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-checkout',
  imports: [
    TableModule,
    NgForOf,
    CurrencyPipe,
    Button,
    Toast
  ],
  templateUrl: './checkout.component.html',
  providers: [MessageService],
})
export class CheckoutComponent implements OnInit {
  cols = [{
      field: 'name',
      header: 'Product'
    }, {
      field: 'quantity',
      header: 'Quantity'
    }, {
      field: 'unit',
      header: 'Unit'
    },
    {
      field: 'priceByUnit',
      header: 'Price By Unit'
    }
  ];
  cartItems: CartItem[] = []
  totalPrice = 0;
  constructor(private cartService: CartService,private router: Router, private messageService : MessageService) {

  }

  ngOnInit(): void {
    this.cartService.getCart().subscribe((cart) => {
      this.cartItems = cart;
      this.totalPrice = cart.reduce((acc, item) => acc + item.priceByUnit * item.quantity, 0);
    });
  }

  checkoutProducts() {
    this.messageService.add({severity:'success', summary: 'Success', detail: 'Checkout completed successfully!'});
    setTimeout(() => {
      this.messageService.clear();
      this.cartService.clearCart();
      this.router.navigate(['']);
    }, 2000);
  }

  backToHome() {
    this.router.navigate(['']);
  }
}
