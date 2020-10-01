import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FoursquareService {

  constructor(private httpClient: HttpClient) { }

  GetAccessToken(code: string): void {
    this.httpClient.get<AccessToken>(`${environment.backEndApi}/authenticate?code=${code}`).subscribe(
      (response: AccessToken) => {
        localStorage.setItem('token', response.access_token);
      });;
  }
}
export interface AccessToken {
  access_token: string;
}