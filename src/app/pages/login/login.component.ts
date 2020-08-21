import { Router } from '@angular/router';
import { CognitoService } from './../../services/cognito.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginInput: FormGroup;

  constructor(
    private fb: FormBuilder,
    private cognito: CognitoService,
    private router: Router
  ) {
    this.initForm();
  }

  initForm() {
    this.loginInput = this.fb.group(
      {
        email: [null, Validators.compose([Validators.required, Validators.email])],
        password: [null, Validators.required]
      }
    );
  }

  ngOnInit(): void {
  }
  async loginSubmit() {
    const res = await this.cognito.login(this.loginInput.get('email').value, this.loginInput.get('password').value)
      .catch(() => {
        alert('ログインに失敗しました');
      });

      if (res) {
        console.log(res);
        this.router.navigateByUrl('home');
      }
  }
}
