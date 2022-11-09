import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-device-tabs',
  templateUrl: './device-tabs.component.html',
})
export class DeviceTabsComponent implements OnInit {
  links = [ 
            {link:"/Home/thiet-bi/list", label: "Thiết bị"},
            {link:"/Home/thiet-bi/hang-muc", label: "Hạng mục"}
          ]
  activeLink = this.links[0];

  constructor(private router: Router) {}

  ngOnInit(): void {
  }

}
