import { Component, Input, OnInit } from '@angular/core';
import { ProductService } from '../../shared/services/product/product.service';
import { ActivatedRoute } from '@angular/router';
import { IProductsResponse } from '../../shared/interfaces/product/product.interface';
import { OrderService } from '../../shared/services/order/order.service';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FavoritesService } from '../../shared/services/favorites/favorites.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-product-info',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, RouterLinkActive, RouterOutlet, MatIconModule],
  templateUrl: './product-info.component.html',
  styleUrl: './product-info.component.scss'
})

export class ProductInfoComponent implements OnInit {
  public currentProduct!: IProductsResponse;
  public userProducts: Array<IProductsResponse> = [];


  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private favoritesService: FavoritesService,
    private orderService: OrderService
  ) { }


  ngOnInit(): void {
    this.activatedRoute.data.subscribe(response => {
      if (response['productInfo']) {
        this.currentProduct = response['productInfo'];
      }
    });
    this.loadProduct()
  }

  loadProduct(): void {
    const categoryName = this.activatedRoute.snapshot.paramMap.get('category') as string;
    this.productService.getAllByCategoryFirebase(categoryName).then(data => {
      this.userProducts = data as IProductsResponse[];
    })
  }

  productCount(product: IProductsResponse, value: boolean): void {
    if (value) {
      ++product.count;
    } else if (!value && product.count > 1) {
      --product.count;
    }
  }

  addToBasket(product: IProductsResponse): void {
    let basket: Array<IProductsResponse> = [];
    if (localStorage.length > 0 && localStorage.getItem('basket')) {
      basket = JSON.parse(localStorage.getItem('basket') as string);
      if (basket.some(prod => prod.id === product.id)) {
        const index = basket.findIndex(prod => prod.id === product.id);
        basket[index].count += product.count;
      } else {
        basket.push(product);
      }
    } else {
      basket.push(product);
    }
    localStorage.setItem('basket', JSON.stringify(basket));
    product.count = 1;
    this.orderService.changeBasket.next(true);
  }


  isFavorite(product: IProductsResponse): boolean {
    return this.favoritesService.isFavorite(product);
  }


  toggleFavorite(product: IProductsResponse): void {
    if (this.favoritesService.isFavorite(product)) {
      this.favoritesService.removeFavorite(product);
      product.favorites = false;
    } else {
      this.favoritesService.addFavorites(product);
      product.favorites = true;
    }
    console.log(product);
  }
}
