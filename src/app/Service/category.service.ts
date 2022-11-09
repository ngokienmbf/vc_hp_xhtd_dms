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
    return this.httpService.getRequest('Category' +'?page='+ page + '&Keyword='+ searchText + '&pageSize='+ numberDis)
      .pipe(map((data : lstCategory) => {
          return data;
      }))
  }
  
  GetAllFull() { // for dropdowns only
    return this.httpService.getRequest(`Category/GetFull`)
    .pipe(map((data : any) => {
      return data.map((i : any) => ({
        id: i.id,
        name:  i.code,
        title: i.name
      } as Item)) as Item[];
    }));
  }

  GetAllFullForList() { // for dropdowns only
    return this.httpService.getRequest(`Category/GetFull`)
    .pipe(map((data: Category[] ) => {
      return data;
  }))
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

  Delete(id: number) {
    return this.httpService.deleteRequest('Category/'+id)
      .pipe(map((data:any ) => {
          return data;
      }))
  }

}
