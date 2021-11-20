import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { switchMap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor (private httpClient: HttpClient) {
  }

  registerUser (): Observable<unknown> {
    return this.httpClient.post<{ publicKey: PublicKeyCredentialCreationOptions }>('/register/begin', {"Username": "bidule_truc"}).pipe(
      switchMap(async response => {
        response.publicKey.challenge = this.str2ab(response.publicKey.challenge as unknown as string);
        response.publicKey.user.id = this.str2ab(response.publicKey.user.id as unknown as string);
        return navigator.credentials.create({ publicKey: response.publicKey })
      }),
    )
  }

  private str2ab(str: string): ArrayBuffer {
    const buf = new ArrayBuffer(str.length*2); // 2 bytes for each char
    const bufView = new Uint16Array(buf);
    for (let i=0, strLen=str.length; i < strLen; i++) {
      bufView[i] = str.charCodeAt(i);
    }
    return buf;
  }


}
