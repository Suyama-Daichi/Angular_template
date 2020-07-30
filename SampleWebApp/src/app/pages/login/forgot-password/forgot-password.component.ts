import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { CognitoService } from 'src/app/services/cognito.service';
import { Router } from '@angular/router';
import { Static } from 'src/app/static';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  email: FormControl = new FormControl(null, Validators.compose([Validators.required, Validators.email]));
  isShowpassword: boolean;
  isSubmited: boolean;
  // errorBorder = 'solid 1px #ea352d';
  constructor(
    private cognito: CognitoService,
    private router: Router,
    public statics: Static
  ) { }

  ngOnInit(): void { }

  async submit() {
    this.isSubmited = true;
    if (!this.email.invalid) {
      const res = await this.cognito.forgotPassword(this.email.value)
        .catch(() => {
          alert('送信失敗');
        })
        console.log(res);
    }
  }

}
