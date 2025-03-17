import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SupabaseService } from '../../services/supabase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container mx-auto px-4 py-8">
      <h2 class="text-2xl font-bold mb-6">Add New Product</h2>
      <form (ngSubmit)="onSubmit()" class="max-w-lg">
        <div class="mb-4">
          <label class="block text-gray-700 mb-2">Name</label>
          <input type="text" [(ngModel)]="product.name" name="name" required class="input-field">
        </div>
        
        <div class="mb-4">
          <label class="block text-gray-700 mb-2">Description</label>
          <textarea [(ngModel)]="product.description" name="description" required class="input-field"></textarea>
        </div>
        
        <div class="mb-4">
          <label class="block text-gray-700 mb-2">Price</label>
          <input type="number" [(ngModel)]="product.price" name="price" required class="input-field">
        </div>
        
        <div class="mb-4">
          <label class="block text-gray-700 mb-2">Category</label>
          <select [(ngModel)]="product.category" name="category" required class="input-field">
            <option value="cables">Cables</option>
            <option value="screen-protectors">Screen Protectors</option>
            <option value="chargers">Chargers</option>
            <option value="audio">Audio</option>
            <option value="wireless-charging">Wireless Charging</option>
            <option value="other">Other</option>
          </select>
        </div>
        
        <div class="mb-4">
          <label class="block text-gray-700 mb-2">Image</label>
          <input type="file" (change)="onFileSelected($event)" accept="image/*" required class="input-field">
        </div>
        
        <button type="submit" [disabled]="isSubmitting" class="btn-primary w-full">
          {{ isSubmitting ? 'Adding Product...' : 'Add Product' }}
        </button>
      </form>
    </div>
  `
})
export class ProductFormComponent {
  product = {
    name: '',
    description: '',
    price: 0,
    category: '',
    image_url: ''
  };
  
  selectedFile: File | null = null;
  isSubmitting = false;

  constructor(
    private supabaseService: SupabaseService,
    private router: Router
  ) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  async onSubmit() {
    if (!this.selectedFile) {
      alert('Please select an image');
      return;
    }

    try {
      this.isSubmitting = true;
      const imageData = await this.supabaseService.uploadImage(this.selectedFile);
      this.product.image_url = imageData.path;
      
      await this.supabaseService.addProduct(this.product);
      
      alert('Product added successfully!');
      this.router.navigate(['/products']);
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Error adding product. Please try again.');
    } finally {
      this.isSubmitting = false;
    }
  }
}