import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CartComponent } from './cart/cart.component';
import { OrderByPipe } from './product-list/orderby.pipe';
import { RatingComponent } from './rating.component';
import { ProductService } from './product.service';
import { AuthGuardService } from './auth-guard.service';
import { UpdateComponent } from '../update/update.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ProductsRoutingModule
  ],
  declarations: [ProductListComponent, ProductDetailComponent, CartComponent, OrderByPipe, RatingComponent, UpdateComponent],
  providers: [ProductService, AuthGuardService]
})
export class ProductsModule { }
