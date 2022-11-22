import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-group-tabs',
  templateUrl: './group-tabs.component.html',
  styleUrls: ['./group-tabs.component.css']
})
export class AccountGroupTabsComponent implements OnInit {
  links = [ 
            {link:"/Home/phan-quyen/nhom", label: "Nhóm"},
            {link:"/Home/phan-quyen/nhom-quyen", label: "Phân quyền"},
          ]
  activeLink = this.links[0];

  constructor(private router: Router) {}

  ngOnInit(): void {
  }

}
