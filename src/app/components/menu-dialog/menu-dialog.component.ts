import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { SharedModule } from "../../shared/shared.module";
import { ICategoryResponse } from '../../shared/interfaces/category/category.interface';
import { CategoryService } from '../../shared/services/category/category.service';
import { IProductsResponse } from '../../shared/interfaces/product/product.interface';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-menu-dialog',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet, MatDialogModule, CommonModule, SharedModule],
  templateUrl: './menu-dialog.component.html',
  styleUrl: './menu-dialog.component.scss'
})
export class MenuDialogComponent implements OnInit {
  public categories: Array<ICategoryResponse> = [];
  public userProducts: Array<IProductsResponse> = [];


  constructor(
    private dialogRef: MatDialogRef<MenuDialogComponent>,
    private categoryService: CategoryService,
  ) { }

  ngOnInit(): void {
    this.getCategories();
  }


  getCategories(): void {
    this.categoryService.getAllFirebase().subscribe((data: ICategoryResponse[]) => {
      this.categories = data as ICategoryResponse[];
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
