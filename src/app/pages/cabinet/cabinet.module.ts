import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CabinetRoutingModule } from './cabinet-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { FavoritesComponent } from '../favorites/favorites.component';
import { CabinetComponent } from './cabinet.component';
import { UserOrderHistoryComponent } from './user-order-history/user-order-history.component';
import { UserDataComponent } from './user-data/user-data.component';
import { UserChangePasswordComponent } from './user-change-password/user-change-password.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CabinetRoutingModule,
    SharedModule,
    FavoritesComponent,
    CabinetComponent,
    UserOrderHistoryComponent ,
    UserDataComponent,
    UserChangePasswordComponent 
  ]
})
export class CabinetModule { }
