import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import {Product} from '../products/product';
import { ProductService } from '../products/product.service';

@Component({
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent {

   product=new Product();
   products:Product[];
   successMessage:String;
   errorMessage:String;
   constructor(private router: Router, private productService: ProductService) {
     this.products=this.productService.products;
    
   }
    valid:boolean=false;
    option:string;
   onChange(value:string){
    this.option=value;
   }
   inputOption:string;
   onChange1(value:string){
    this.inputOption=value;
   }

  
   getName(){
     this.successMessage=null;
     this.errorMessage=null;
   const code=this.product.productCode;
     let price:number=this.product.price;
     let productC:String=this.product.productCode;
     const product=this.products.filter(currProduct=>currProduct.productCode==code);
  
     //const productName=this.products.filter(currProduct=>currProduct.productCode==code);
     this.productService.updateForm(productC,price).subscribe(
       (response)=>{
          this.successMessage="Book Updated Successfully:[ BookName: "+response.productName+" ,Price: "+response.price+"]";
       },
       (response)=>{
        this.errorMessage=response.error.message;
         
       }
     )
      
   }

   
   category:string;
   onChange2(value:string){
    this.category=value;
   }
   addBook(){
     let addProduct:Product=new  Product();
     this.successMessage=null;
     this.errorMessage=null;
     
     addProduct.productName=this.product.productName;
     addProduct.price=this.product.price;
     addProduct.description=this.product.description;
     addProduct.imageUrl="assets/add/"+this.product.imageUrl;
     addProduct.manufacturer=this.product.manufacturer;
     addProduct.rating=this.product.rating;

     this.productService.addForm(addProduct,this.category).subscribe(
      (response)=>{
        this.successMessage= "Book Added Successfully: "+response.productName;
     },
     (response)=>{
      this.errorMessage=response.error.message;
       
     }
     )
   }

   delete(){
     this.successMessage=null;
     this.errorMessage=null;
    let productD:String=this.product.productCode;
    this.productService.deleteForm(productD).subscribe(
      (response)=>{
        this.successMessage=response.description;
      },
      (response)=>{
        this.errorMessage=response.error.message;
      }
    )
   }
 
}
