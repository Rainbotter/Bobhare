import {Injectable} from '@angular/core'
import slugify from 'slugify'

@Injectable({
  providedIn: 'root'
})
export class StringService {

  constructor() {
  }

  public slugify(value: string): string {
    return slugify(value, {
      lower: true,
      strict: true,
    })
  }
}
