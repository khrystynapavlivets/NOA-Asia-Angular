import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AdminComponent } from './admin.component';
import { AdminCategoryComponent } from './admin-category/admin-category.component';
import { AdminProductComponent } from './admin-product/admin-product.component';
import { AdminVacanciesComponent } from './admin-vacancies/admin-vacancies.component';
import { AdminOrderComponent } from './admin-order/admin-order.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    AdminComponent,
    AdminCategoryComponent,
    AdminProductComponent,
    AdminVacanciesComponent,
    AdminOrderComponent,
  ],
})
export class AdminModule { }