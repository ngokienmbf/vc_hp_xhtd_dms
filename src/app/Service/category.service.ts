import { Injectable } from '@angular/core';
import { RequestService } from  './request.service';
import { AccountService } from  './account.service';
import { lstCategory,Category } from '../Model/Category'
import { map } from 'rxjs';
import { Item } from '../Model/multidropdown';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpService: RequestService, private accountService: AccountService) { }

  Insert(CategoryCreate: Category) {
    CategoryCreate.createBy = this.accountService.getUserInfo()['userName'] || 'null';
    CategoryCreate.createDay = new Date();
    CategoryCreate.updateBy = this.accountService.getUserInfo()['userName'] || 'null';
    CategoryCreate.updateDay = new Date();
    return this.httpService.postRequest('Category',CategoryCreate)
      .pipe(map((data: any) => {
        return data;
      }))
  }

  Paging(page:number, searchText:string,numberDis:number) {
    return this.httpService.getRequest('Category/GetAllWithDevice' +'?page='+ page + '&Keyword='+ searchText + '&pageSize='+ numberDis)
      .pipe(map((data : lstCategory) => {
          return data;
      }))
  }
  
  GetFull() { // for dropdowns only
    return this.httpService.getRequest(`Category/GetFull`)
    .pipe(map((data : any) => {
      return data.map((i : any) => ({
        id: i.id,
        name:  i.code,
        title: i.name
      } as Item)) as Item[];
    }));
  }

  GetFullForList() {
    return this.httpService.getRequest(`Category/GetFull`)
    .pipe(map((data: Category[] ) => {
      return data;
  }))
  }

  GetFullForControl() {
    return this.httpService.getRequest(`Category/GetFull`)
    .pipe(map((data: Category[] ) => {
      let this_ = {
        categoryList : data,
        countActiveCat : 0,
        countDeactiveCat: 0,
        countActiveDev: 0,
        countDeactiveDev: 0,
      };

      // not working
      for (let i = 0; i < this_.categoryList.length, i++;){
        console.log(this_.categoryList);
        if (this_.categoryList[i].state){
          this_.countActiveCat=this_.countActiveCat+1;
        }else {
          this_.countDeactiveCat++;
        }

        this_.categoryList[i]._countActiveDevices=0;
        this_.categoryList[i]._countDeactiveDevices=0;

        for (let j= 0; j < this_.categoryList[i].devices.length, j++;){
          if (this_.categoryList[i].devices[j].state){
            this_.countActiveDev++;
            this_.categoryList[i]._countActiveDevices++;
          }else {
            this_.countDeactiveDev++;
            this_.categoryList[i]._countDeactiveDevices++;
          }
        }
      }

      return this_;
    })) ;
  }

  GetDetail(id: number) {
    return this.httpService.getRequest('Category',id)
      .pipe(map((data:Category ) => {
          return data;
      }))
  }

  GetWithVehicles(id: number) {
    return this.httpService.getRequest('Category/GetWithVehicles',id)
      .pipe(map((data:Category ) => {
          return data;
      }))
  }

  Update(CategoryEdit: Category) {
    CategoryEdit.updateBy = this.accountService.getUserInfo()['userName'] || 'null';
    CategoryEdit.updateDay = new Date();
    return this.httpService.putRequest('Category',CategoryEdit)
      .pipe(map((data: any) => {
        return data;
      }))
  }

  UpdateState(CategoryEdit: Category) {
    CategoryEdit.updateBy = this.accountService.getUserInfo()['userName'] || 'null';
    CategoryEdit.updateDay = new Date();
    return this.httpService.putRequest('Category/UpdateState',CategoryEdit)
      .pipe(map((data: any) => {
        return data;
      }))
  }

  Delete(id: number) {
    return this.httpService.deleteRequest('Category/'+id)
      .pipe(map((data:any ) => {
          return data;
      }))
  }

}
