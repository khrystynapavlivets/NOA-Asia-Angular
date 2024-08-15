import { Component } from '@angular/core';
import { OrderService } from '../../shared/services/order/order.service';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { IProductsResponse } from '../../shared/interfaces/product/product.interface';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from '../../shared/shared.module';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ROLE } from '../../shared/constants/role.constant';
import { AuthUserDialogComponent } from '../auth-user-dialog/auth-user-dialog.component';


@Component({
  selector: 'app-basket-dialog',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet, MatIconModule, SharedModule],
  templateUrl: './basket-dialog.component.html',
  styleUrl: './basket-dialog.component.scss'
})
export class BasketDialogComponent {

  public basketEmpty = true;
  public total = 0;
  public basket: Array<IProductsResponse> = [];
  public count = 0;
  public isOpenBasket = true;

  constructor(
    private orderService: OrderService,
    public dialog: MatDialog,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.loadBasket();
    this.updateBasket();
    this.updateLocalStorage();
  }

  loadBasket(): void {
    if (localStorage.length > 0 && localStorage.getItem('basket')) {
      this.basket = JSON.parse(localStorage.getItem('basket') as string);
    }
    this.getTotalPrice();
  }


  getTotalPrice(): void {
    this.total = this.basket
      .reduce((total: number, prod: IProductsResponse) => total + prod.count * prod.price, 0);
    this.count = this.basket
      .reduce((total: number, prod: IProductsResponse) => total + prod.count, 0);
  }

  updateBasket(): void {
    this.orderService.changeBasket.subscribe(() => {
      this.loadBasket();
    })
  }

  updateLocalStorage(): void {
    localStorage.setItem('basket', JSON.stringify(this.basket));
    this.getTotalPrice();
  }

  closePopup(): void {
    this.isOpenBasket = false;
    document.body.classList.remove('dialog-backdrop-blur');
  }

  closeDialog(): void {
    if (this.isOpenBasket) {
      this.isOpenBasket = false;
      document.body.classList.remove('dialog-backdrop-blur');
    }
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

  submitOrder(): void {
    this.isOpenBasket = false;
    document.body.classList.remove('dialog-backdrop-blur');
    this.closeDialog();
  }

  orderProduct(): void {
    const user = JSON.parse(localStorage.getItem('currentUser') as string);
    if (user && user.role === ROLE.USER) {
      this.router.navigate(['/ordersProduct']);
    } else {
      this.dialog.open(AuthUserDialogComponent, {
        backdropClass: 'dialog-back',
        panelClass: 'auth-dialog',
        autoFocus: false,
        position: {
          top: '100px',
        },
      });
    }
  }

}
