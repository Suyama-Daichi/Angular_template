import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginInput: FormGroup;

  constructor(private fb: FormBuilder) {
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

}
