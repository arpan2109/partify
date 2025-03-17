import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SupabaseService } from '../services/supabase.service';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl:'home.component.html', 
  styles:`.pos-img{
  position: relative;
    left: 4rem;
    }
    .pos-icon{
    position: relative;
    top: 1rem;
    left: 1rem;}`
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  bestSellers: Product[] = [];
  shopGramImages = [
    'assets/gram01.png',
    'assets/gram02.png',
    'assets/gram03.png',
    'assets/laptop.png',
    'assets/gram05.png'
  ];

  constructor(private supabaseService: SupabaseService) {}

  async ngOnInit() {
    try {
      this.products = await this.supabaseService.getProducts();
      this.bestSellers = this.products.slice(0, 4);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }
}