import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../models/product.model';
import { SupabaseService } from '../services/supabase.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./product-list.componet.html"
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(private supabaseService: SupabaseService) {}

  async ngOnInit() {
    try {
      this.products = await this.supabaseService.getProducts();
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }
}