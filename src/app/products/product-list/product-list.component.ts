import { Component } from '@angular/core';
import {Router} from '@angular/router';
import { ProductService } from '../product.service';
import { Cart } from '../cart/Cart';
import { Product } from '../product';

@Component({
    templateUrl: 'product-list.component.html',
    styleUrls: ['product-list.component.css']
})
export class ProductListComponent {
    rate: number;
    pageTitle = 'BookThief';
    imageWidth = 80;
    imageHeight = 120;
    imageMargin = 12;
    showImage = false;
    listFilter: string;
   
    errorMessage: string;
    products: any = [];
    selectedItems: any = 0;
    cart: Cart;
    total = 0;
    orderId = 0;
    userName:string;
    checkedPrice: any[];
    sub: any;
    i = 0;
    value=false;
    sortoption = '';
    productType:string="Fictional";        
    constructor(private _productService: ProductService,private _router: Router) {
        

        this.userName = sessionStorage.getItem('username');
        document.getElementById('login').style.display = '';
        document.getElementById('login').innerHTML = 'Logout';
        sessionStorage.setItem('loginTitle', 'Logout');
        this.orderId++;
        document.getElementById('welcome').style.display = '';
        //    this._productService.username = sessionStorage.getItem("username");
        //    document.getElementById("welcome").innerHTML = "Welcome " + sessionStorage.getItem("username");
        document.getElementById('welcome').style.color = '#ff0080';
        //  document.getElementById("welcome").style.position = "relative";
        //   document.getElementById("welcome").style.top = "15px";
        this._productService.getProducts().subscribe(
            products => {
                this._productService.products = products;
                this.products = this._productService.products;
            },
            error => this.errorMessage = <any>error);

        if (_productService.selectedProducts.length > 0) {
            this.selectedItems = Number(sessionStorage.getItem('selectedItems'));
            this.total = Number(sessionStorage.getItem('grandTotal'));
        }
    }

    



    addCart(id: number) {
        this.cart = new Cart();
        this.selectedItems += 1;

        // fetching selected product details
        const product = this._productService.products.filter((currProduct: any) => currProduct.productId === id)[0];
        this.total += product.price;
        sessionStorage.setItem('selectedItems', this.selectedItems);
        const sp = this._productService.selectedProducts.filter((currProduct: any) => currProduct.productId === id)[0];
        if (sp) {
            const index = this._productService.selectedProducts.findIndex((currProduct: any) => currProduct.productId === id);
            this._productService.selectedProducts[index].quantity += 1;
            this._productService.selectedProducts[index].totalPrice += product.price;
        } else {
            this.cart.orderId = 'ORD_' + this.orderId;
            this.cart.productId = id;
            this.cart.userId = sessionStorage.getItem('username');
            this.cart.productName = product.productName;
            this.cart.price = product.price;
            this.cart.quantity = 1;
            this.cart.dateOfPurchase = new Date().toString();
            this.cart.totalPrice = product.price * this.cart.quantity;
            this._productService.selectedProducts.push(this.cart);
            sessionStorage.setItem('selectedProducts', JSON.stringify(this._productService.selectedProducts));
            this.orderId++;
        }
    }

    searchtext() {
        this.products = this._productService.products;
        if (this.listFilter.length > 0) {
            this.products = this.products.filter((product: Product) =>
                product.manufacturer.toLowerCase().indexOf(this.listFilter) !== -1);
        }
    }

    tabselect(producttype: string) {
        this.productType=producttype;
        this.products = [];
        this._productService.producttype = producttype;

        this._productService.getProducts().subscribe(
            products => {
                this._productService.products = products;
                this.products = this._productService.products;
                // console.log(this.products);
            },
            error => this.errorMessage = <any>error);
    }

    onChange(value: string) {
        this.sortoption = value;
    }
     update(){
        this._router.navigate(['/update']);
     }

}

