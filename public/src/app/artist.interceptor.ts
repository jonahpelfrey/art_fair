import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

@Injectable()
export class ArtistInterceptor implements HttpInterceptor {

	intercept (req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		const clonedRequest = req.clone({
            headers: req.headers.set(
                'X-CustomAuthHeader', 
                'authService.getToken()')
        });

        console.log("new headers", clonedRequest.headers.keys());

		return next.handle(clonedRequest).do(event => {
			if(event instanceof HttpResponse) {
				const time = new Date().toLocaleString();
				console.log(`Request happened at ${time}.`);
			}
		});
	}
}