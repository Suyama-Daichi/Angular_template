import { Static } from './../../static';
import { CognitoService } from './../../services/cognito.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupInput: FormGroup;
  isShowpassword: boolean;
  isSubmited: boolean;
  // errorBorder = 'solid 1px #ea352d';
  constructor(
    private fb: FormBuilder,
    private cognito: CognitoService,
    private router: Router,
    public statics: Static
  ) {
    this.initForm();
  }

  ngOnInit(): void {
  }

  initForm() {
    this.signupInput = this.fb.group(
      {
        nickName: [null, Validators.required],
        email: [null, Validators.compose([Validators.required, Validators.email])],
        password: [null, Validators.compose([Validators.required, Validators.pattern(this.statics.passwordRegExp)])]
      }
    );
  }

  async signinSubmit() {
    this.isSubmited = true;
    if (!this.signupInput.invalid) {
      const nickName = { Name: 'nickname', Value: this.signupInput.get('nickName').value as string };
      const email = { Name: 'email', Value: this.signupInput.get('email').value as string };
      const attributes = [];
      attributes.push(nickName);
      attributes.push(email);
      const res = await this.cognito.signup(this.signupInput.get('password').value, attributes)
        .catch(() => {
          alert('入力したメールアドレスは使われています');
        });
        if (res) {
          this.router.navigateByUrl('signup/confirm', { state: { email: email.Value } });
        }
      console.log(this.signupInput);
    }
  }

}
