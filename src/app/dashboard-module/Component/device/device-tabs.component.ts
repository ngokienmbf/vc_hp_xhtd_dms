import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-device-tabs',
  templateUrl: './device-tabs.component.html',
  styleUrls: ['./device-tabs.component.css']
})
export class DeviceTabsComponent implements OnInit {
  links = [ 
            {link:"/Home/thiet-bi/dieu-khien", label: "Điều khiển"},
            {link:"/Home/thiet-bi/hang-muc", label: "Hạng mục"},
            {link:"/Home/thiet-bi/list", label: "Thiết bị"},
          ]
  activeLink = this.links[0];

  constructor(private router: Router) {}

  ngOnInit(): void {
  }

}
