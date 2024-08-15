import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavoritesComponent } from '../favorites/favorites.component';
import { CabinetComponent } from './cabinet.component';
import { UserOrderHistoryComponent } from './user-order-history/user-order-history.component';
import { UserDataComponent } from './user-data/user-data.component';
import { UserChangePasswordComponent } from './user-change-password/user-change-password.component';

const routes: Routes = [
  {
    path: '', component: CabinetComponent, children: [
      { path: 'user', component: UserDataComponent },
      { path: 'history', component: UserOrderHistoryComponent },
      { path: 'favorites', component: FavoritesComponent },
      { path: 'password', component: UserChangePasswordComponent },
      { path: '', pathMatch: 'full', redirectTo: 'user'}

    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CabinetRoutingModule { }
