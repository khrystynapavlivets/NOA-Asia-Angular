import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { SharedModule } from "../../shared/shared.module";
import { ICategoryResponse } from '../../shared/interfaces/category/category.interface';
import { CategoryService } from '../../shared/services/category/category.service';
import { IProductsResponse } from '../../shared/interfaces/product/product.interface';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet, CommonModule, SharedModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  public categories: Array<ICategoryResponse> = [];
  public userProducts: Array<IProductsResponse> = [];
  public expanded: boolean = false;


  constructor(

    private categoryService: CategoryService,
  ) { }

  ngOnInit(): void {
    this.getCategories();
  }


  getCategories(): void {
    this.categoryService.getAllFirebase().subscribe((data: ICategoryResponse[])=> {
      this.categories = data as ICategoryResponse[];
    });
  }


  toggleText() {
    this.expanded = !this.expanded;
  }



}
