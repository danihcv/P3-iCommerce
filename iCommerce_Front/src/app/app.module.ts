import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NewProductComponent } from './components/update-product/new-product/new-product.component';
import { ViewProductComponent } from './components/view-product/view-product.component';
import { ProductService } from './services/product.service';
import { SearchProductComponent } from './components/search/search-product/search-product.component';
import { SearchCategoryComponent } from './components/search/search-category/search-category.component';
import { SearchPopularityComponent } from './components/search/search-popularity/search-popularity.component';
import { EditProductComponent } from './components/update-product/edit-product/edit-product.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { CheckoutService } from './services/checkout.service';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import {UserService} from './services/user.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    NewProductComponent,
    ViewProductComponent,
    SearchProductComponent,
    SearchCategoryComponent,
    SearchPopularityComponent,
    EditProductComponent,
    CheckoutComponent,
    RegisterUserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterUserComponent },
      { path: 'checkout', component: CheckoutComponent },
      { path: 'newProduct', component: NewProductComponent },
      { path: 'editProduct/:id', component: EditProductComponent },
      { path: 'product/:id', component: ViewProductComponent },
      { path: 'search/category/:term', component: SearchCategoryComponent },
      { path: 'search/product/:term', component: SearchProductComponent },
      { path: 'search/popularity', component: SearchPopularityComponent },
      { path: '**', redirectTo: '' }
      ]
    )
  ],
  providers: [
    ProductService,
    CheckoutService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
