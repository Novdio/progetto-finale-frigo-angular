import { HttpEvent, HttpHandler, HttpHandlerFn, HttpInterceptor, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

export const AuthInterceptor:HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>>  =>
{
    {
        let token = localStorage.getItem("token");
        if(token)
        {
            req = req.clone({
                setHeaders:{Authorization: 'Bearer '+token}
            });
        }
        return next(req);//vai avanti poi normalmente
    }
}