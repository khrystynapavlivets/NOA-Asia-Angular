import { Injectable } from "@angular/core";
import {
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
  Resolve,
} from "@angular/router";
import { Observable, map } from 'rxjs';
import { IProductsResponse } from '../../interfaces/product/product.interface';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class ProductInfoResolver implements Resolve<IProductsResponse> {

  constructor(private productService: ProductService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | IProductsResponse
    | Observable<IProductsResponse>
    | Promise<IProductsResponse> {
    const PRODUCT_ID = route.paramMap.get('id');
    return this.productService.getOneFirebase(PRODUCT_ID as string).pipe(
      map((data) => {
        console.log('from RESOLVER', data)
        return data as IProductsResponse;
      })
    );
  }
}

