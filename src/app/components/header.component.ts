import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
 templateUrl:'header.component.html',
  styles: [
    `
      .logo {
        width: 3rem;
      }
      .nav-link {
        @apply text-gray-700 hover:text-gray-900 transition-colors duration-200;
      }
    `,
  ],
})
export class HeaderComponent {
  isMenuOpen = false; // Tracks the state of the mobile menu

  // Toggle the mobile menu
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  // Close the mobile menu
  closeMenu() {
    this.isMenuOpen = false;
  }
}

// <--  <a routerLink="/shop" class="nav-link">Shop</a>-->
// <-- <a routerLink="/pages" class="nav-link">Pages</a>-->
// <-- <a routerLink="/blog" class="nav-link">Blog</a> -->