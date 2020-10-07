import { AccessToken, FoursquareService } from './../../services/foursquare.service';
import { FirebaseAuthService } from './../../services/firebase-auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    public firebaseAuth: FirebaseAuthService,
    private route: ActivatedRoute,
    private router: Router,
    public foursqure: FoursquareService
  ) { }

  ngOnInit(): void {
    if (this.route.snapshot.queryParamMap.get('code')) {
      this.GetCustomToken(this.route.snapshot.queryParamMap.get('code'));
    }
  }
  GetCustomToken(code: string) {
    this.foursqure.GetAccessToken(code).subscribe(
      async (response: AccessToken) => {
        localStorage.setItem('token', response.access_token);
        const fsUser = await this.foursqure.GetUserData(response.access_token);
        if (await this.firebaseAuth.loginWithFoursquare((await this.firebaseAuth.ExchangeCustomToken(fsUser.response.user.id).toPromise()).token, fsUser.response.user, response.access_token)) {
          this.router.navigateByUrl('/dashboard');
        }
      }
    );
  }
}
