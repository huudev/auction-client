import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  isCollapse = true;
  constructor(private auth: AuthService) { }

  ngOnInit() {
  }


  tooggleMenu() {
    this.isCollapse = !this.isCollapse;
  }

}
