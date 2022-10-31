import { Injectable } from '@angular/core';
import  { CommonserviceService } from  './commonservice.service';
import { lstDriver,DriverCreate,Driver,DriverEdit } from '../Model/Driver'
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DriverService {

  constructor(private httpService: CommonserviceService) { }


  Paging(page:number, searchText:string,numberDis:number) {
    return this.httpService.getRequest('Driver' +'?page='+ page + '&Keyword='+ searchText + '&pageSize='+ numberDis)
      .pipe(map((data : lstDriver) => {
          return data;
      }))
  }

  Insert(DriverCreate: DriverCreate) {
    return this.httpService.postRequest('Driver/Create',DriverCreate)
      .pipe(map((data: any) => {
        return data;
      }))
  }

  GetDetail(id: number) {
    return this.httpService.getRequest('Driver/GetDetail?id='+id)
      .pipe(map((data:Driver ) => {
          return data;
      }))
  }

  Update(DriverEdit : DriverEdit)
  {
    return this.httpService.putRequest('Driver/Update',DriverEdit)
      .pipe(map((data: any) => {
        return data;
      }))
  }

  Delete(id: number) {
    return this.httpService.deleteRequest('Driver/Delete?id='+id)
      .pipe(map((data:any ) => {
          return data;
      }))
  }

  GetAllEmpty() {
    return this.httpService.getRequest('Driver/getAllEmpty')
      .pipe(map((data : lstDriver) => {
          return data;
      }))
  }

  GetByLicensePlates(licensePlates: string) {
    return this.httpService.getRequest(`Driver/getByLicensePlate?licensePlates=${licensePlates}`);
  }

}
