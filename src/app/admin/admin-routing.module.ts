import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminCategoryComponent } from './admin-category/admin-category.component';
import { AdminProductComponent } from './admin-product/admin-product.component';
import { AdminOrderComponent } from './admin-order/admin-order.component';
import { AdminVacanciesComponent } from './admin-vacancies/admin-vacancies.component';

const routes: Routes = [
    {
        path: '', component: AdminComponent, children: [
            { path: 'category', component: AdminCategoryComponent },
            { path: 'product', component: AdminProductComponent },
            { path: 'vacancies', component: AdminVacanciesComponent },
            { path: 'order', component: AdminOrderComponent },
            { path: '', pathMatch: 'full', redirectTo: 'category' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }