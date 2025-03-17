import { Component, isDevMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, RouterOutlet } from '@angular/router';
import { HomeComponent } from './app/components/home.component';
import { ProductListComponent } from './app/components/product-list.component';
import { ProductFormComponent } from './app/components/admin/product-form.component';
import { HeaderComponent } from './app/components/header.component';
import { FooterComponent } from './app/components/footer.component';
import { provideServiceWorker } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent,FooterComponent],
  template: `
    <app-header></app-header>
    <router-outlet></router-outlet>
    <app-footer></app-footer>
  `
})
export class App {
  name = 'Ecomus';
}

const routes = [
  { path: '', component: HomeComponent },
  { path: 'products', component: ProductListComponent },
  { path: 'admin', component: ProductFormComponent }
];

bootstrapApplication(App, {
  providers: [
    provideRouter(routes),
    provideServiceWorker('ngsw-worker.js', {
        enabled: !isDevMode(),
        registrationStrategy: 'registerWhenStable:30000'
    })
]
});