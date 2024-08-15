import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';


const MATERIAL = [
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatMenuModule,
  MatIconModule,
  MatCardModule,
  MatSelectModule,

];


@NgModule({
  declarations: [],
  imports: [
    ...MATERIAL,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  exports: [
    ...MATERIAL,
    FormsModule,
    ReactiveFormsModule,

    CommonModule,
  ],
  providers: [MatMenuTrigger]
})
export class SharedModule { }
