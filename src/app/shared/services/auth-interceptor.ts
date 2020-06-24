import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';

@Injectable()

export class AuthInterceptor implements HttpInterceptor, OnInit{

    constructor() {}

    //token = localStorage.getItem("Token");
    
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        //console.log(this.token);
       

        const authRequest = req.clone({
            headers: req.headers.set("Authorization", "Bearer " + localStorage.getItem("Token"))
        })
        return next.handle(authRequest);
        
    }

    ngOnInit(): void {
        
        
    }

}