import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()

export class AuthInterceptor implements HttpInterceptor{

    constructor() {}

    token = localStorage.getItem("Token");
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const authRequest = req.clone({
            headers: req.headers.set("Authorization", "Bearer " + this.token)
        })
        return next.handle(authRequest);
    }

}