import { Routes } from '@angular/router';
import {FruitsComponent} from '@components/fruits/fruits.component';
import {ProductComponent} from '@components/product/product.component';
import {CheckoutComponent} from '@components/checkout/checkout.component';
import {VegetablesComponent} from '@components/vegetables/vegetables.component';
import {SaleComponent} from '@components/sale/sale.component';

export const routes: Routes = [
  {
    path: '',
    component: SaleComponent,
  },
  {
    path: 'fruits',
    component: FruitsComponent,
  },
  {
    path: 'products/:type/:id',
    component: ProductComponent,
  },
  {
    path: 'vegetable',
    component: VegetablesComponent,
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
  }
];
