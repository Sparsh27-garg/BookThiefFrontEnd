import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators'
import { map } from 'rxjs/operators';

import { Product } from './product';

@Injectable()
export class ProductService {
   // private _productUrl = 'assets/products/fictional.json';
    private _productUrl = "http://localhost:8765/bookthiefAPI/getFiction";

    selectedProducts: any = [];
    products: any = [];
    producttype = 'Fictional';
    username: string;
    constructor(private http: HttpClient) {
        if (sessionStorage.getItem('selectedProducts')) {
            this.selectedProducts = JSON.parse(sessionStorage.getItem('selectedProducts'));
        }
    }

    getProducts(): Observable<Product[]> {
        if (this.producttype === 'Fictional') {
            return this.http.get<Product[]>("http://localhost:8765/bookthiefAPI/getFiction").pipe(
        catchError(this.handleError));
          // return this.http.get<Product[]>('assets/products/fictional.json').pipe(
          //      catchError(this.handleError));
        } else if (this.producttype === 'Best Sellers') {
           return this.http.get<Product[]>("http://localhost:8765/bookthiefAPI/getBest").pipe(
                catchError(this.handleError));
           // return this.http.get<Product[]>('assets/products/romance.json').pipe(
           //     catchError(this.handleError));
        }
    }

    getProduct(id: number): Observable<Product> {
        return this.getProducts().pipe(
            map(products => products.filter(product => product.productId === id)[0]));
    }
     
    updateForm(productCode:String,price:number):Observable<Product>{
        return this.http.post<Product>("http://localhost:8765/bookthiefAPI/updateBook/"+productCode,price);
    }
    addForm(product:Product,category:string):Observable<Product>{
        return this.http.post<Product>("http://localhost:8765/bookthiefAPI/addBook/"+category,product);
    }
    deleteForm(productCode:String):Observable<Product>{
        return this.http.delete<Product>("http://localhost:8765/bookthiefAPI/deleteBook/"+productCode);
    }

    private handleError(err: HttpErrorResponse) {
        console.log(err);
        return Observable.throw(err.error() || 'Server error');
    }
}
