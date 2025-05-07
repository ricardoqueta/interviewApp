import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '@services/product/product.service';
import {CurrencyPipe, Location, NgIf} from '@angular/common';
import { Product } from '@models/product.interface';
import { Card } from 'primeng/card';
import { Button } from 'primeng/button';
import { InputNumber } from 'primeng/inputnumber';
import { Panel } from 'primeng/panel';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CartService} from '@services/cart/cart.service';
import {CartItem} from '@models/cart.interface';
import {Badge} from 'primeng/badge';
import {Toast} from 'primeng/toast';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  imports: [
    Card,
    Button,
    Panel,
    InputNumber,
    ReactiveFormsModule,
    CurrencyPipe,
    NgIf,
    Badge,
    Toast,
  ],
  providers: [MessageService],
})
export class ProductComponent implements OnInit {
  product: Product | null = null;
  type: string | null = null;
  id: number | null = null;

  formGroup = new FormGroup({
    quantity: new FormControl(1, [Validators.required, Validators.min(1)]),
  });


  constructor(private route: ActivatedRoute,
              private productService: ProductService,
              private location :Location,
              private cartService:CartService,
              private messageService : MessageService
              ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.type = params.get('type');
      this.id = Number(params.get('id'));

      if (this.type && this.id) {
        this.productService.getById(this.id).subscribe((data) => {
          this.product = data || null;
        });
      }
    });
  }

  submit($event: SubmitEvent) {
    // get the value of the form
    $event.preventDefault();
    if (this.formGroup.invalid) {
      return;
    }
    if (!this.product) {
      return;
    }
    const quantity = this.formGroup.get('quantity')?.value;
    if (!quantity || !this.product.priceByUnit) {
      return;
    }
    const cartItem: CartItem = {
      id: this.product.id,
      name: this.product.name,
      priceByUnit: this.product.salePriceByUnit ? this.product.salePriceByUnit : this.product.priceByUnit,
      quantity: quantity,
      unit: this.product.unit,
      type: this.product.type,
      sale: !!this.product.salePriceByUnit,
    };

    this.cartService.addToCart(cartItem);
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: `${this.product.name} added to cart`,
      life: 3000,
    });
  }

  goBack() {
    this.location.back();
  }

}
