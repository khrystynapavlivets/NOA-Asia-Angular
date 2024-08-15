import { Component } from '@angular/core';
import { IProductsResponse } from '../../shared/interfaces/product/product.interface';
import { OrderService } from '../../shared/services/order/order.service';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet, CommonModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent {
  public basketArray: Array<IProductsResponse> = [];
  public basket: Array<IProductsResponse> = [];
  public total = 0;
  public count = 0;



  ngOnInit(): void {
    this.loadBasket();
    this.updateBasket();
    this.updateLocalStorage();
  }

  constructor(private orderService: OrderService
  ) { }

  loadBasket(): void {
    if (localStorage.length > 0 && localStorage.getItem('basket')) {
      this.basket = JSON.parse(localStorage.getItem('basket') as string);
    }
    this.getTotalPrice();
  }

  getTotalPrice(): void {
    this.total = this.basket.reduce((total: number, prod: IProductsResponse) =>
      total + prod.count * prod.price, 0)
    this.count = this.basket.reduce(
      (total: number, prod: IProductsResponse) => total + prod.count,
      0
    );
  }

  updateBasket(): void {
    this.orderService.changeBasket.subscribe(() =>
      this.loadBasket())
  }
  updateLocalStorage(): void {
    localStorage.setItem('basket', JSON.stringify(this.basket));
    this.getTotalPrice();
  }
  productCount(product: IProductsResponse, value: boolean): void {
    let basket: Array<IProductsResponse> = [];
    basket = JSON.parse(localStorage.getItem('basket') as string);
    if (basket.some((prod) => prod.id === product.id)) {
      const index = basket.findIndex((prod) => prod.id === product.id);
      if (value) {
        ++product.count;
        basket[index].count += 1;
      } else if (!value && product.count > 1) {
        --product.count;
        basket[index].count -= 1;
      }
    }
    localStorage.setItem('basket', JSON.stringify(basket));
    this.getTotalPrice();
    this.orderService.changeBasket.next(true);
  }

  delete(product: IProductsResponse) {
    if (this.basket.some((prod) => prod.id === product.id)) {
      const index = this.basket.findIndex(
        (prod) => prod.id === product.id
      );
      this.basket.splice(index, 1);
      localStorage.setItem('basket', JSON.stringify(this.basket));
      this.updateBasket();
      this.orderService.changeBasket.next(true);
    }
  }
}
