import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpRequest, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Get the bearer token from a service (replace with your logic)
        //const token = AuthService.getToken();
        const token = '';

        console.log("FROM INTERCEPTOR")

        
        if (token) {
            const authReq = req.clone({
                setHeaders: { 
                  //Authorization: `Bearer ${token}`,
                  'Content-Type': 'application/json',
                  'Accept': '*/*',
                }
            });
            return next.handle(authReq);
        }

        return next.handle(req);
    }
}
