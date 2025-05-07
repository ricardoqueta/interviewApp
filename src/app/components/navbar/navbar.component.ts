import {Component, OnInit} from '@angular/core';
import {Ripple} from 'primeng/ripple';
import {PrimeTemplate} from 'primeng/api';
import {Menubar} from 'primeng/menubar';
import {MenuItem} from 'primeng/api';
import {CartComponent} from '@components/cart/cart.component';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {AutoComplete, AutoCompleteCompleteEvent} from 'primeng/autocomplete';
import {Product} from '@models/product.interface';
import {ProductService} from '@services/product/product.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [
    Ripple,
    PrimeTemplate,
    Menubar,
    CartComponent,
    ReactiveFormsModule,
    AutoComplete,
  ],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {
  products : string[]  = [];
  originalProducts : Product[]  = [];
  filteredProducts: string[] = [];

  formGroup = new FormGroup({
    selectedProduct: new FormControl(undefined),
  });

  items: MenuItem[]  = [
    {
      label: 'Sale',
      url: ''
    },
    {
      label: 'Fruits',
      url: 'fruits'
    },
    {
      label: 'Vegetable',
      url: '/vegetable'
    },
  ];

  constructor(private fruitsService: ProductService, private router: Router) {
  }

  ngOnInit() {
    this.fruitsService.getAllFruits().subscribe((data: Product[]) => {
      // make array of strings from data
      this.products = data.map((fruit) => {
        return fruit.name;
      });
      this.originalProducts = data;
    });
  }

  goToProduct(event: any): void {
    const selectedProductData = this.originalProducts.find(product => product.name === event.value);
    if (selectedProductData) {
      this.router.navigate(['/products', selectedProductData.type, selectedProductData.id]);
    }
  }

  filterCountry(event: AutoCompleteCompleteEvent) {
    this.filteredProducts = this.products.filter((product) => {
      return product.toLowerCase().includes(event.query.toLowerCase());
    });
  }
}
