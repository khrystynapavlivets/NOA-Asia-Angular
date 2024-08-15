import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatDialog } from '@angular/material/dialog'
import { MenuDialogComponent } from '../menu-dialog/menu-dialog.component';
import { SharedModule } from "../../shared/shared.module";
import { CommonModule } from '@angular/common';
import { BasketDialogComponent } from '../basket-dialog/basket-dialog.component';
import { IProductsResponse } from '../../shared/interfaces/product/product.interface';
import { ILogin } from '../../shared/interfaces/account/account.interface';
import { OrderService } from '../../shared/services/order/order.service';
import { AccountService } from '../../shared/services/account/account.service';
import { AuthorizationComponent } from '../../pages/authorization/authorization.component';
import { AuthUserDialogComponent } from '../auth-user-dialog/auth-user-dialog.component';
import { ROLE } from '../../shared/constants/role.constant';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    SharedModule,
    CommonModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})

export class HeaderComponent {

  public basket: Array<IProductsResponse> = [];
  public currentUser: Array<ILogin> = [];
  public total = 0;
  public count = 0;
  public isOpenBasket = true;
  public isLogin = false;
  public loginUrl = '';
  public loginPage = '';

  constructor(public dialog: MatDialog,
    private orderService: OrderService,
    private accountService: AccountService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.loadBasket();
    this.updateBasket();
    this.checkUpdatesUserLogin();
  }

  loadBasket(): void {
    if (typeof localStorage !== 'undefined' && localStorage.length > 0 && localStorage.getItem('basket')) {
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

  checkUserLogin(): void {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
    if (currentUser && currentUser.role === ROLE.ADMIN) {
      this.isLogin = true;
      this.loginUrl = 'admin';
      this.loginPage = 'Admin';
    } else if (currentUser && currentUser.role === ROLE.USER) {
      this.isLogin = true;
      this.loginUrl = 'cabinet';
      this.loginPage = currentUser.firstName;
    } else {
      this.isLogin = false;
      this.loginUrl = '';
      this.loginPage = '';
    }
  }

  checkUpdatesUserLogin(): void {
    this.accountService.isUserLogin$.subscribe(() => {
      this.checkUserLogin();
    })
  }


  openMenuDialog(): void {
    document.body.classList.add('dialog-backdrop-blur');
    this.dialog
      .open(MenuDialogComponent, {
        backdropClass: 'dialog-back',
        panelClass: 'menu-dialog',
        height: '59vh',
        width: '72vw',
        position: {
          top: '101px',
        },
        autoFocus: false,
        closeOnNavigation: true,
      })
      .afterClosed()
      .subscribe((result) => {
        document.body.classList.remove('dialog-backdrop-blur');
      });
  }

  openBasketModal(): void {
    document.body.classList.add('dialog-backdrop-blur');
    const dialogRef = this.dialog.open(BasketDialogComponent, {
      backdropClass: 'custom-backdrop',
      autoFocus: false,
      closeOnNavigation: true,
    }).afterClosed()
      .subscribe((result) => {
        document.body.classList.remove('dialog-backdrop-blur');
      });
  }

  openLoginDialog(): void {
    this.dialog.open(AuthUserDialogComponent, {
      autoFocus: false,
      closeOnNavigation: true,
    }).afterClosed().subscribe({})
  }

  openModal() {
    this.isOpenBasket = false;
  }
}
