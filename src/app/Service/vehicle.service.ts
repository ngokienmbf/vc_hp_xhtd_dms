import { Injectable } from '@angular/core';
import { RequestService } from  './request.service';
import { AccountService } from  './account.service';
import { lstVehicle,Vehicle } from '../Model/Vehicle'
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(private httpService: RequestService,private accountService: AccountService) { }

  Paging(page:number, searchText:string,numberDis:number) {
    return this.httpService.getRequest('Vehicle' +'?page='+ page + '&Keyword='+ searchText + '&pageSize='+ numberDis)
      .pipe(map((data : lstVehicle) => {
          return data;
      }))
  }

  Insert(VehicleCreate: any) {
    VehicleCreate.createBy = this.accountService.getUserInfo()['userName'] || 'null';
    VehicleCreate.createDay = new Date();
    VehicleCreate.updateBy = this.accountService.getUserInfo()['userName'] || 'null';
    VehicleCreate.updateDay = new Date();
    return this.httpService.postRequest('Vehicle',VehicleCreate)
      .pipe(map((data: any) => {
        return data;
      }))
  }

  GetDetail(id: number) {
    return this.httpService.getRequest(`Vehicle/${id}`)
      .pipe(map((data:Vehicle ) => {
          return data;
      }))
  }

  Update(VehicleEdit : any)
  {
    return this.httpService.putRequest('Vehicle',VehicleEdit)
      .pipe(map((data: any) => {
        return data;
      }))
  }

  Delete(id: number) {
    return this.httpService.deleteRequest(`Vehicle/${id}`)
      .pipe(map((data:any ) => {
          return data;
      }))
  }

  GetVehiclesNoRfid(page:number, searchText:string,numberDis:number) {
    return this.httpService.getRequest(`Vehicle/getVehiclesNoRfid?page=${page}&Keyword=${searchText}&pageSize=${numberDis}`)
    .pipe(map((data : lstVehicle) => {
        return data;
    }))
  }

}
