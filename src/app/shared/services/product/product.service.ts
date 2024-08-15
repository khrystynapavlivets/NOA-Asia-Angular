import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProductsRequest, IProductsResponse } from '../../interfaces/product/product.interface';
import {
  collectionData,
  CollectionReference,
  doc,
  docData,
  Firestore,
  getDocs,
  query,
  updateDoc,
  where,
} from "@angular/fire/firestore";
import {
  addDoc,
  collection,
  deleteDoc,
  DocumentData,
} from '@firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private url = environment.BACKEND_URL;
  private api = { products: `${this.url}/products` };

  private productCollection!: CollectionReference<DocumentData>;
  
  constructor(private http: HttpClient,
    private afs: Firestore,
    ) {  
    this.productCollection = collection(this.afs, 'products');
  }


  // getAll(): Observable<IProductsResponse[]> {
  //   return this.http.get<IProductsResponse[]>(this.api.products);
  // }

  // getOne(id: number): Observable<IProductsResponse> {
  //   return this.http.get<IProductsResponse>(`${this.api.products}/${id}`);
  // }

  // getAllByCategory(name: string): Observable<IProductsResponse[]> {
  //   return this.http.get<IProductsResponse[]>(`${this.api.products}?category.path=${name}`);
  // }


  // create(product: IProductsRequest): Observable<IProductsResponse> {
  //   return this.http.post<IProductsResponse>(this.api.products, product);
  // }

  // update(product: IProductsRequest, id: number): Observable<IProductsResponse> {
  //   return this.http.patch<IProductsResponse>(`${this.api.products}/${id}`, product);
  // }

  // delete(id: number): Observable<void> {
  //   return this.http.delete<void>(`${this.api.products}/${id}`);
  // }
  getAllFirebase() {
    return collectionData(this.productCollection, { idField: 'id' });
  }

  async getAllByCategoryFirebase(name: string): Promise<IProductsResponse[]> {
    const arr: IProductsResponse[] = [];
    const category = query(
      collection(this.afs, 'products'),
      where('category.path', '==', `${name}`)
    );
    const querySnapshot = await getDocs(category);
    querySnapshot.forEach((doc) => {
      arr.push({ ...doc.data(), id: doc.id } as IProductsResponse);
    });
    return arr;
  }
  
  getOneFirebase(id: string) {
    const productDocumentReferencee = doc(this.afs, `products/${id}`);
    return docData(productDocumentReferencee, { idField: 'id' });
  }

  createFirebase(product:IProductsRequest) {
    return addDoc(this.productCollection,product);
  }

  updateFirebase(product: IProductsRequest, id: string) {
    const productDocumentReferencee = doc(this.afs, `products/${id}`);
    return updateDoc(productDocumentReferencee, {...product});
  }

  deleteFirebase(id: string) {
    const productDocumentReferencee = doc(this.afs, `products/${id}`);
    return deleteDoc(productDocumentReferencee);
  }


  // isInWishlist(product: IProductsResponse): boolean {
  //   return this.wishListItems.some(prod => prod.id === product.id && prod.favorites);
  // }

  // removeFromWishlist(product: IProductsResponse): void {
  //   const index = this.wishListItems.findIndex(prod => prod.id === product.id && prod.favorites);
  //   if (index !== -1) {
  //     this.wishListItems.splice(index, 1);
  //     this.updateLocalStorage();
  //   }
  // }

  // // addToWishlist(product: IProductsResponse): void {
  // //   this.wishListItems.push({ ...product, favorites: true });
  // //   this.updateLocalStorage();
  // // }

  // addToWishlist(product: IProductsResponse): void {
  //   const productWithFavorite = { ...product, favorites: true };
  //   this.http.post<IProductsResponse>(this.api.products, productWithFavorite).subscribe(
  //     response => {
  //       this.wishListItems.push(response);
  //       this.updateLocalStorage();
  //     },
  //     error => {
  //       console.error('Error adding to wishlist:', error);
  //     }
  //   );
  // }

  // updateLocalStorage(): void {
  //   localStorage.setItem('favorites', JSON.stringify(this.wishListItems));
  // }

  // getAll(): Observable<IProductsResponse[]> {
  //   return this.http.get<IProductsResponse[]>(this.api.products);
  // }

  // create(product: IProductsRequest): Observable<IProductsResponse> {
  //   return this.http.post<IProductsResponse>(this.api.products, product);
  // }

  // update(product: IProductsRequest, id: number): Observable<IProductsResponse> {
  //   return this.http.patch<IProductsResponse>(`${this.api.products}/${id}`, product);
  // }

  // delete(id: number): Observable<void> {
  //   return this.http.delete<void>(`${this.api.products}/${id}`);
  // }
}
