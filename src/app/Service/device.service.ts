import { Injectable } from '@angular/core';
import { RequestService } from  './request.service';
import { AccountService } from  './account.service';
import { lstDevice,Device } from '../Model/Device'
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor(private httpService: RequestService,private accountService: AccountService) { }

  Insert(DeviceCreate: Device) {
    DeviceCreate.createBy = this.accountService.getUserInfo()['userName'] || 'null';
    DeviceCreate.createDay = new Date();
    DeviceCreate.updateBy = this.accountService.getUserInfo()['userName'] || 'null';
    DeviceCreate.updateDay = new Date();
    return this.httpService.postRequest('Device',DeviceCreate)
      .pipe(map((data: any) => {
        return data;
      }))
  }

  Paging(page:number, searchText:string,numberDis:number) {
    return this.httpService.getRequest('Device' +'?page='+ page + '&Keyword='+ searchText + '&pageSize='+ numberDis)
      .pipe(map((data : lstDevice) => {
          return data;
      }))
  }

  GetDetail(id: number) {
    return this.httpService.getRequest('Device',id)
      .pipe(map((data:Device ) => {
          return data;
      }))
  }

  Update(DeviceEdit: Device) {
    DeviceEdit.updateBy = this.accountService.getUserInfo()['userName'] || 'null';
    DeviceEdit.updateDay = new Date();
    return this.httpService.putRequest('Device',DeviceEdit)
      .pipe(map((data: any) => {
        return data;
      }))
  }

  Delete(id: number) {
    return this.httpService.deleteRequest('Device/'+id)
      .pipe(map((data:any ) => {
          return data;
      }))
  }

}
