import { Component, OnDestroy, OnInit } from '@angular/core';
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
export class HomeComponent implements OnInit,OnDestroy {
  products: Product[] = [];
  bestSellers: Product[] = [];
  shopGramImages = [
    'assets/gram01.png',
    'assets/gram02.png',
    'assets/gram03.png',
    'assets/laptop.png',
    'assets/gram05.png'
  ];
 // Timer variables
 hours: number = 24;
 minutes: number = 5;
 seconds: number = 11;

 // Timer interval reference
 private timerInterval: any;

  constructor(private supabaseService: SupabaseService) {}

  async ngOnInit() {
    try {
      this.products = await this.supabaseService.getProducts();
      this.bestSellers = this.products.slice(0, 4);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
    this.startTimer();
  }
  ngOnDestroy() {
    // Clear the interval when the component is destroyed
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  // Start the countdown timer
  startTimer() {
    this.timerInterval = setInterval(() => {
      if (this.seconds > 0) {
        this.seconds--;
      } else {
        if (this.minutes > 0) {
          this.minutes--;
          this.seconds = 59;
        } else {
          if (this.hours > 0) {
            this.hours--;
            this.minutes = 59;
            this.seconds = 59;
          } else {
            // Timer has ended
            clearInterval(this.timerInterval);
          }
        }
      }
    }, 1000);
  }

  // Format time to always display two digits (e.g., 05 instead of 5)
  formatTime(time: number): string {
    return time < 10 ? `0${time}` : time.toString();
  }
}