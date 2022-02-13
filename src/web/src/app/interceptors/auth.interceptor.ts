import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApplicationService } from '../services/application.service';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private app: ApplicationService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let finalRequest;

    // Auto inject access token if it exists
    if (this.app.secretHeader) {
      finalRequest = request.clone(
        {
          headers: request.headers.append(environment.secret_header, this.app.secretHeader),
        });
    } else {
      finalRequest = request;
    }

    return next.handle(finalRequest);
  }
}
