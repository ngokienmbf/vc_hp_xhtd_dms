import { Injectable } from '@angular/core';
import { RequestService } from  './request.service';
import { AccountService } from  './account.service';
import { lstDriverVehicle,DriverVehicle } from '../Model/DriverVehicle'
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DriverVehicleService {

  constructor(private httpService: RequestService,private accountService: AccountService) { }

  Insert(DriverVehicleCreate: DriverVehicle) {
    DriverVehicleCreate.createBy = this.accountService.getUserInfo()['userName'] || 'null';
    DriverVehicleCreate.createDay = new Date();
    DriverVehicleCreate.updateBy = this.accountService.getUserInfo()['userName'] || 'null';
    DriverVehicleCreate.updateDay = new Date();
    return this.httpService.postRequest('DriverVehicle',DriverVehicleCreate)
      .pipe(map((data: any) => {
        return data;
      }))
  }

  Paging(page:number, searchText:string, numberDis:number) {
    return this.httpService.getRequest('DriverVehicle' +'?page='+ page + '&Keyword='+ searchText + '&pageSize='+ numberDis)
      .pipe(map((data : lstDriverVehicle) => {
          return data;
      }))
  }

  GetDetail(id: number) {
    return this.httpService.getRequest('DriverVehicle',id)
      .pipe(map((data:DriverVehicle ) => {
          return data;
      }))
  }

  Update(DriverVehicleEdit: DriverVehicle) {
    DriverVehicleEdit.updateBy = this.accountService.getUserInfo()['userName'] || 'null';
    DriverVehicleEdit.updateDay = new Date();
    return this.httpService.putRequest('DriverVehicle',DriverVehicleEdit)
      .pipe(map((data: any) => {
        return data;
      }))
  }

  Delete(id: number) {
    return this.httpService.deleteRequest('DriverVehicle/'+id)
      .pipe(map((data:any ) => {
          return data;
      }))
  }

  // GetByLicensePlates(licensePlates: string) {
  //   return this.httpService.getRequest(`Vehicle/getByLicensePlate?licensePlates=${licensePlates}`);
  // }
}
