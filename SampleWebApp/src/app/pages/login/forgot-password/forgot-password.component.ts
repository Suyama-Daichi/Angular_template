import { Component, OnInit } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { CognitoService } from 'src/app/services/cognito.service';
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
  isSendEmail: boolean;
  isResendEmail: boolean;
  constructor(
    private cognito: CognitoService,
    public statics: Static
  ) { }

  ngOnInit(): void { }

  async submit(resend: boolean) {
    this.isSubmited = true;
    if (!this.email.invalid) {
      const res = await this.cognito.forgotPassword(this.email.value)
        .catch(() => {
          alert('送信失敗');
        })
      if (res) {
        this.isSendEmail = true;
        this.isResendEmail = resend;
      }
    }
  }

}
