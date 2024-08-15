import {
  RouterModule,
  Routes,
  RouterLinkActive,
  PreloadAllModules,
} from "@angular/router";

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ToastrModule } from "ngx-toastr";
import { SharedModule } from "./shared/shared.module";
import { ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { ProductInfoResolver } from "./shared/services/product/product-info.resolver";
import { AuthGuard } from "./shared/guards/auth/auth.guard";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



import { HomeComponent } from "./pages/home/home.component";
import { AboutComponent } from "./pages/about/about.component";
import { ProductComponent } from "./pages/product/product.component";
import { ProductInfoComponent } from "./pages/product-info/product-info.component";
import { DeliveryComponent } from "./pages/delivery/delivery.component";
import { CheckoutComponent } from "./pages/checkout/checkout.component";
import { CabinetComponent } from "./pages/cabinet/cabinet.component";
import { OffertaComponent } from "./pages/offerta/offerta.component";
import { DonatymoComponent } from "./pages/donatymo/donatymo.component";
import { ContactComponent } from "./pages/contact/contact.component";
import { FavoritesComponent } from "./pages/favorites/favorites.component";
import { FeedbackComponent } from "./pages/feedback/feedback.component";
import { VacanciesComponent } from "./pages/vacancies/vacancies.component";



export const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "about", component: AboutComponent },
  { path: "product", component: ProductComponent },
  { path: "product-info", component: ProductInfoComponent },
  { path: "product/:category", component: ProductComponent },
  {
    path: "product/:category/:id",
    component: ProductInfoComponent,
    resolve: { productInfo: ProductInfoResolver },
  },
  { path: "delivery", component: DeliveryComponent },
  { path: "checkout", component: CheckoutComponent },
  { path: "offerta", component: OffertaComponent },
  { path: "donatymo", component: DonatymoComponent },
  { path: "contact", component: ContactComponent },
  { path: "favorites", component: FavoritesComponent },
  { path: "feedback", component: FeedbackComponent },
  { path: "vacancies", component: VacanciesComponent },
  {
    path: "admin",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("./admin/admin.module").then((m) => m.AdminModule),
  },
  {
    path: "auth",
    loadChildren: () =>
      import("./pages/authorization/authorization.module").then((m) => m.AuthorizationModule,
      ),
  },
  {
    path: 'cabinet',
    loadChildren: () => import('./pages/cabinet/cabinet.module').then(m => m.CabinetModule)
  },
];

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
    }),
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    SharedModule,
    RouterModule.forRoot(routes),
  ],
  providers: [provideHttpClient()],
  exports: [RouterModule, RouterLinkActive, SharedModule],
})
export class AppRoutingModule { }
