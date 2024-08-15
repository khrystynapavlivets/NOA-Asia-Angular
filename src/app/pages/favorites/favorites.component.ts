import { Component, Input } from '@angular/core';
import { IProductsResponse } from '../../shared/interfaces/product/product.interface';
import { CutTextPipe } from "../../shared/pipes/cut-text.pipe";
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FavoritesService } from '../../shared/services/favorites/favorites.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CutTextPipe, RouterLink, RouterLinkActive, RouterOutlet, CommonModule, MatIconModule],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss'
})
export class FavoritesComponent {
  public favoriteProducts: IProductsResponse[] = [];

  constructor(private favoritesService: FavoritesService) { }

  ngOnInit(): void {
    this.loadFavoriteProducts();
  }

  private loadFavoriteProducts(): void {
    this.favoriteProducts = this.favoritesService.getFavoriteProducts();
  }
  removeFromFavorites(product: IProductsResponse): void {
    this.favoritesService.removeFavorite(product);
    this.loadFavoriteProducts(); 
  }
}
