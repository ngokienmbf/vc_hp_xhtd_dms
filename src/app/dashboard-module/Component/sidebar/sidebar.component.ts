import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { ROUTE_DATA, TypeRoute } from './sidebar'
import { Router } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { AccountService } from 'src/app/Service/account.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  animations: [
    trigger('slideVertical', [
      state(
        '*',
        style({
          height: 0
        })
      ),
      state(
        'show',
        style({
          height: '*'
        })
      ),
      transition('* => *', [animate('400ms cubic-bezier(0.25, 0.8, 0.25, 1)')])
    ])
  ]
})
export class SidebarComponent implements OnInit {

  treeControl = new NestedTreeControl<TypeRoute>(node => node.children);
  dataSource = new MatTreeNestedDataSource<TypeRoute>();
  activeNode: any;
  // dataMenu:any;
  constructor(private router: Router, private AccountService: AccountService) { 
  }

  ngOnInit(): void {
    this.categoryParent();
  }

  categoryParent() {
    var userInfo = this.AccountService.getUserInfo();
    var listRole = userInfo.listRole || [];
    var menu: any = [];
    
      for (let j = 0; j < ROUTE_DATA.length; j++) {
        if (!ROUTE_DATA[j]['roles'] ||this.intersectArray(ROUTE_DATA[j]['roles'], listRole)> -1)  {
            var item: any = {};
            item['name'] = ROUTE_DATA[j]['name'];
            
            if (ROUTE_DATA[j]['children']) {
              item['children'] = this.categoryChild(listRole, ROUTE_DATA[j]['children']);
            } else {
              item['url'] = ROUTE_DATA[j]['url'];
            }
            menu.push(item)
        }
    }
    
    this.dataSource.data = menu;
  }

  categoryChild(listRole: any, subRoute: any) {
    var subMenu: any = [];
    for (let i = 0; i < subRoute.length; i++) {

      if (!subRoute[i]['roles'] || this.intersectArray(subRoute[i]['roles'], listRole) > -1)  {
        var subItem: any = {};
        subItem['name'] = subRoute[i]['name'];
        subItem['url'] = subRoute[i]['url'];
        subMenu.push(subItem)
      }
    }
    return subMenu;
  }

  // kiem tra xem list role cua user va list role cua menu/submenu co chung role khong
  intersectArray (arr1: any, arr2: any) {
    //arr1.sort();
    //arr2.sort();
    for(var i = 0; i < arr1.length; i += 1) {
        if(arr2.indexOf(arr1[i]) > -1){
            return 1
        }
    }
    return -1;
  };  

  LoadSideBar() // hàm sau để load sibar theo role;
  {
    const UserInfo = JSON.parse(localStorage.getItem('UserInfo') || '{}');
    const lstRole = UserInfo.listRole;
  }

  hasChild = (_: number, node: TypeRoute) => !!node.children && node.children.length > 0;


  ChangeUrl(url: string) {
    this.router.navigate(['/Home/' + url]);
  }

}
function uniq(arr: any, arg1: string) {
  throw new Error('Function not implemented.');
}

