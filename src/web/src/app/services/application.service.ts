import {Injectable} from '@angular/core';
import * as localforage from "localforage";

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  private _secretHeader?: string;

  private storageKey: string = 'authPassword';

  constructor() {
    localforage.getItem<string>(this.storageKey).then(value => {
      if (value) {
        this._secretHeader = value;
      }
    });
  }

  get secretHeader(): string {
    return this._secretHeader || "";
  }

  set secretHeader(password: string) {
    localforage.setItem(this.storageKey, password).then(_ => this._secretHeader = password);
  }

}
