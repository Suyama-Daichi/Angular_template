import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  session: string;
  userId: string;
  constructor() { }
}
