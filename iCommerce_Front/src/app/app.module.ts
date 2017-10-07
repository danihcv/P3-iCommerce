import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import {LoginComponent} from './components/login/login.component';
import { NewProductComponent } from './components/new-product/new-product.component';
import { ViewProductComponent } from './components/view-product/view-product.component';
import { ProductService } from './services/product.service';
import { SearchProductComponent } from './components/search/search-product/search-product.component';
import { SearchCategoryComponent } from './components/search/search-category/search-category.component';
import { SearchPopularityComponent } from './components/search/search-popularity/search-popularity.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    NewProductComponent,
    ViewProductComponent,
    SearchProductComponent,
    SearchCategoryComponent,
    SearchPopularityComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'login', component: LoginComponent },
      { path: 'newProduct', component: NewProductComponent },
      { path: 'product/:id', component: ViewProductComponent },
      { path: 'search/category/:term', component: SearchCategoryComponent },
      { path: 'search/product/:term', component: SearchProductComponent },
      { path: 'search/popularity', component: SearchPopularityComponent },
      { path: '**', redirectTo: '' }
      ]
    )
  ],
  providers: [
    ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
