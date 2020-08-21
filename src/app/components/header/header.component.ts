import { Router } from '@angular/router';
import { CognitoService } from './../../services/cognito.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatMenu } from '@angular/material/menu';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isSmartPhone: boolean;
  constructor(
    private cognito: CognitoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.isSmartPhone = window.innerWidth < 425;
  }

  async logout() {
    const res = await this.cognito.logout()
      .catch(() => {
        console.error('ログアウトに失敗しました')
      });

    if (res) {
      this.router.navigateByUrl('login')
    }
  }


}
