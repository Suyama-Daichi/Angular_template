import { Router } from '@angular/router';
import { StoreService } from './../../../services/store.service';
import { Static } from './../../../static';
import { CognitoService } from './../../../services/cognito.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-confirm-account',
  templateUrl: './confirm-account.component.html',
  styleUrls: ['./confirm-account.component.scss']
})
export class ConfirmAccountComponent implements OnInit {
  confirmInput: FormControl = new FormControl(null, Validators.compose([Validators.required, Validators.pattern(/\d{6}/)]))
  isSubmited: boolean;
  email: string;
  constructor(
    private cognito: CognitoService,
    public statics: Static,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.email = window.history.state.email;
  }

  async signinSubmit() {
    this.isSubmited = true;
    if (!this.confirmInput.invalid) {
      const res = await this.cognito.confirmAccont(this.email, this.confirmInput.value)
        .catch(() => {
          alert('認証コードが誤っています');
        })
      if (res) {
        this.router.navigateByUrl('home');
      }
    }
  }
}
