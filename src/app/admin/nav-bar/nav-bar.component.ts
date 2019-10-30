import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  isCollapse = true;
  constructor(public auth: AuthService) { }

  ngOnInit() {
  }
  tooggleMenu() {
    this.isCollapse = !this.isCollapse;
  }

}
