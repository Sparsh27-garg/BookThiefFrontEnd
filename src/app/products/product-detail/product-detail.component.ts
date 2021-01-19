import { Component } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';

import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
    templateUrl: 'product-detail.component.html',
    styleUrls: ['product-detail.component.css']
})
export class ProductDetailComponent {
    pageTitle = 'Product Detail';
    product: Product=new Product();
    imageWidth = 100;
    imageMargin = 2;
    errorMessage: string;
    id = 0;
    products:any[];
    constructor(private route: ActivatedRoute,
        private router: Router, public productService: ProductService) {
        this.id = +this.route.snapshot.paramMap.get('id');
      console.log(this.id);
        this.products=this.productService.products;
        console.table(this.products);
        this.product = this.products.filter(currProduct=> currProduct.productId == this.id)[0];
        console.log(this.product);
    }

    onBack(): void {
        this.router.navigate(['/products']);
    }
    
}
