import { Injectable } from '@angular/core';
import  { CommonserviceService } from  './commonservice.service';
import { lstVehicle,VehicleCreate,Vehicle,VehicleEdit } from '../Model/Vehicle'
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(private httpService: CommonserviceService) { }


  Paging(page:number, searchText:string,numberDis:number) {
    return this.httpService.getRequest('Vehicle' +'?page='+ page + '&Keyword='+ searchText + '&pageSize='+ numberDis)
      .pipe(map((data : lstVehicle) => {
          return data;
      }))
  }

  Insert(VehicleCreate: VehicleCreate) {
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

  Update(VehicleEdit : VehicleEdit)
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

  GetAllEmpty() {
    return this.httpService.getRequest('Vehicle/getAllEmpty')
      .pipe(map((data : lstVehicle) => {
          return data;
      }))
  }

  GetByLicensePlates(licensePlates: string) {
    return this.httpService.getRequest(`Vehicle/getByLicensePlate?licensePlates=${licensePlates}`);
  }

}
