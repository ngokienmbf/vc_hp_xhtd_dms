import { Injectable } from '@angular/core';
import { RequestService } from  './request.service';
import { AccountService } from  './account.service';
import { lstDriver,Driver } from '../Model/Driver'
import { map } from 'rxjs';
import { Item } from '../Model/multidropdown';

@Injectable({
  providedIn: 'root'
})
export class DriverService {

  constructor(private httpService: RequestService, private accountService: AccountService) { }

  Insert(DriverCreate: Driver) {
    DriverCreate.createBy = this.accountService.getUserInfo()['userName'] || 'null';
    DriverCreate.createDay = new Date();
    DriverCreate.updateBy = this.accountService.getUserInfo()['userName'] || 'null';
    DriverCreate.updateDay = new Date();
    return this.httpService.postRequest('Driver',DriverCreate)
      .pipe(map((data: any) => {
        return data;
      }))
  }

  Paging(page:number, searchText:string,numberDis:number) {
    return this.httpService.getRequest('Driver' +'?page='+ page + '&Keyword='+ searchText + '&pageSize='+ numberDis)
      .pipe(map((data : lstDriver) => {
          return data;
      }))
  }
  
  GetFull() { // for dropdowns only
    return this.httpService.getRequest(`Driver/GetFull`)
    .pipe(map((data : any) => {
      return data.map((i : any) => ({
        id: i.id,
        name:  i.userName,
        title: i.fullName
      } as Item)) as Item[];
    }));
  }

  GetDetail(id: number) {
    return this.httpService.getRequest('Driver',id)
      .pipe(map((data:Driver ) => {
          return data;
      }))
  }

  GetWithVehicles(id: number) {
    return this.httpService.getRequest('Driver/GetWithVehicles',id)
      .pipe(map((data:Driver ) => {
          return data;
      }))
  }

  Update(DriverEdit: Driver) {
    DriverEdit.updateBy = this.accountService.getUserInfo()['userName'] || 'null';
    DriverEdit.updateDay = new Date();
    return this.httpService.putRequest('Driver',DriverEdit)
      .pipe(map((data: any) => {
        return data;
      }))
  }

  Delete(id: number) {
    return this.httpService.deleteRequest('Driver/'+id)
      .pipe(map((data:any ) => {
          return data;
      }))
  }

}
