import { Component, Input } from '@angular/core';
import { IProductsResponse } from '../../shared/interfaces/product/product.interface';
import { ProductService } from '../../shared/services/product/product.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { CutTextPipe } from "../../shared/pipes/cut-text.pipe";
import { ICategoryResponse } from '../../shared/interfaces/category/category.interface';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FavoritesService } from '../../shared/services/favorites/favorites.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CutTextPipe, RouterLink, RouterLinkActive, RouterOutlet, CommonModule, MatIconModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {

  public userProducts: Array<IProductsResponse> = [];
  public categories: Array<ICategoryResponse> = [];
  private eventSubscription!: Subscription;

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private favoritesService: FavoritesService,
    private router: Router,
  ) {
    this.eventSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.loadProducts();
      }
    })
  }

  ngOnInit(): void {
    this.loadProducts();

  }

  loadProducts(): void {
    const categoryName = this.activatedRoute.snapshot.paramMap.get('category') as string;
    this.productService.getAllByCategoryFirebase(categoryName).then( data=> {
      this.userProducts = data as IProductsResponse[];
    })
  }

  ngOnDestroy(): void {
    this.eventSubscription.unsubscribe();
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