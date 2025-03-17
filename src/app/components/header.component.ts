import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header class="bg-white">
      <div class="container mx-auto px-4">
        <nav class="flex items-center justify-between h-16">
        <div class="flex items-center">
          <img src="assets/logo_full_name.png" class="logo pr-2"/>
          <a routerLink="/" class="text-2xl font-bold pl-2">
          
          Partify</a>
          </div>
          <div class="hidden md:flex space-x-8">
            <a routerLink="/" class="nav-link">Home</a>
           
            <a routerLink="/products" class="nav-link">Products</a>
          
          </div>

          <div class="flex items-center space-x-6">
            <button class="nav-link">
              <span class="material-icons">search</span>
            </button>
            <button class="nav-link">
              <span class="material-icons">person</span>
            </button>
            <button class="nav-link relative">
              <span class="material-icons">shopping_cart</span>
              <span class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">2</span>
            </button>
          </div>
        </nav>
      </div>
    </header>
  `,
  styles:`.logo{
  width:3rem;
  }`
})
export class HeaderComponent {}

// <--  <a routerLink="/shop" class="nav-link">Shop</a>-->
// <-- <a routerLink="/pages" class="nav-link">Pages</a>-->
// <-- <a routerLink="/blog" class="nav-link">Blog</a> -->