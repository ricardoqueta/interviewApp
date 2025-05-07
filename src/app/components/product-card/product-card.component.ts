import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Card } from 'primeng/card';
import { Input } from '@angular/core';
import { Product } from '@models/product.interface';
import {CurrencyPipe, NgIf} from '@angular/common';
import {Badge} from 'primeng/badge';
@Component({
  selector: 'app-product-card',
  imports: [
    RouterLink,
    Card,
    RouterLinkActive,
    CurrencyPipe,
    NgIf,
    Badge,
  ],
  templateUrl: './product-card.component.html',
})
export class ProductCardComponent {
  @Input() product: Product | undefined = undefined;
}
