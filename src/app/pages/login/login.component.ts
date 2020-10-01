import { FoursquareService } from './../../services/foursquare.service';
import { FirebaseAuthService } from './../../services/firebase-auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    public firebaseAuth: FirebaseAuthService,
    private route: ActivatedRoute,
    private foursqure: FoursquareService
  ) { }

  ngOnInit(): void {
    if (this.route.snapshot.queryParamMap.get('code')) {
      this.GetAccessToken(this.route.snapshot.queryParamMap.get('code'));
    }
  }
  GetAccessToken(code: string) {
    this.foursqure.GetAccessTokenObservable(code);
  }
}
