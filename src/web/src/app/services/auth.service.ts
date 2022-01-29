import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import {first} from "rxjs/operators";
import {AuthRequest} from "../models/auth.request";
import {UrlService} from "./url.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient,
              private urlService: UrlService) {
  }

  public logIn(password: string): Observable<{}> {
    if (!password) {
      throw new Error("password is empty");
    }

    const body: AuthRequest = {
      password
    };

    return this.httpClient.post<{}>(this.urlService.getGetAuthUrl(), body)
      .pipe(
        first()
      );
  }

}
