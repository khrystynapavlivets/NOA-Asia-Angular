import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { IProductsResponse } from '../../interfaces/product/product.interface';

@Injectable({
  providedIn: 'root'
})

export class FavoritesService {

  private url = environment.BACKEND_URL;
  private api = { products: `${this.url}/products` };

  private favorites: IProductsResponse[] = [];

  constructor(private http: HttpClient) {
    this.loadFavorites();
  }

  private loadFavorites(): void {
    if (typeof window !== 'undefined' && localStorage) {
      const storedItems = localStorage.getItem('favorites');
      if (storedItems) {
        this.favorites = JSON.parse(storedItems);
      }
    }
  }
  
  isFavorite(product: IProductsResponse): boolean {
    return this.favorites.some(prod => prod.id === product.id && prod.favorites);
  }

  removeFavorite(product: IProductsResponse): void {
    const index = this.favorites.findIndex(prod => prod.id === product.id && prod.favorites);
    if (index !== -1) {
      this.favorites.splice(index, 1);
      this.updateLocalStorage();
    }
  }

  addFavorites(product: IProductsResponse): void {
    const index = this.favorites.findIndex(prod => prod.id === product.id);

    if (index !== -1) {
      // Якщо продукт вже існує в масиві, оновлюємо його статус
      this.favorites[index].favorites = !this.favorites[index].favorites;
    } else {
      // Якщо продукт не існує в масиві, додаємо його
      const productWithFavorite = { ...product, favorites: true };
      this.favorites.push(productWithFavorite);
    }

    this.updateLocalStorage();
  }

  getFavoriteProducts(): IProductsResponse[] {
    return this.favorites.filter(product => product.favorites);
  }

  private updateLocalStorage(): void {
    if (typeof window !== 'undefined' && localStorage) {
      localStorage.setItem('favorites', JSON.stringify(this.favorites));
    }
  }

}
