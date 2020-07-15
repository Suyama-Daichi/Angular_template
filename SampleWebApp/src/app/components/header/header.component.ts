import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const hamburger = document.getElementById('Hamburger');
    const header_nav = document.getElementById('Header-Nav');
    hamburger.addEventListener('click', function () {
      header_nav.classList.toggle("active");
    });
  }


}
