import { FirebaseAuthService } from 'src/app/services/firebase-auth.service';
import { FoursquareUser } from './../models/foursquare/foursquare-user';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FoursquareService {

  constructor(
    private httpClient: HttpClient,
    private firebaseAuth: FirebaseAuthService
  ) { }

  GetAccessToken(code: string) {
    return this.httpClient.get<AccessToken>(`${environment.backEndApi}/authenticate?code=${code}`)
  }

  GetUserData(token: string) {
    return this.httpClient.get<FoursquareUser>(`${environment.foursquare.endpoint}/users/self?&oauth_token=${token}&v=20201001`).toPromise();
  }
}
export interface AccessToken {
  access_token: string;
}