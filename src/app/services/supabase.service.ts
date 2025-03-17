import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../environments/environment';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
  }

  async getProducts(): Promise<Product[]> {
    const { data, error } = await this.supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  }

  async addProduct(product: Omit<Product, 'id' | 'created_at'>) {
    const { data, error } = await this.supabase
      .from('products')
      .insert(product)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  async uploadImage(file: File) {
    const fileName = `${Date.now()}-${file.name}`;
    const { data, error } = await this.supabase
      .storage
      .from('product-images')
      .upload(fileName, file);
    
    if (error) throw error;
    
    const { data: { publicUrl } } = this.supabase
      .storage
      .from('product-images')
      .getPublicUrl(fileName);
    
    return { path: publicUrl };
  }
}