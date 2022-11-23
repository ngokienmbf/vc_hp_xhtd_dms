import { RequestService } from './request.service';
import { lstSystemParameter, SystemParameter } from '../Model/SystemParameter';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SystemParameterService {

  constructor(private httpService: RequestService) { }


  Paging(page: number, searchText: string, numberDis: number) {
    return this.httpService.getRequest(`systemParameter?page=${page}&Keyword=${searchText}&pageSize=${numberDis}`)
      .pipe(map((data: lstSystemParameter) => {
        return data;
      }))
  }

  GetDetail(id: number) {
    return this.httpService.getRequest(`systemParameter/${id}`)
      .pipe(map((data: SystemParameter) => {
        return data;
      }))
  }

  Update(data: any) {
    return this.httpService.putRequest('systemParameter', data)
      .pipe(map((data: any) => {
        return data;
      }))
  }

  Insert(data: any) {
    return this.httpService.postRequest('systemParameter', data)
      .pipe(map((data: any) => {
        return data;
      }))
  }

  Delete(id: number) {
    return this.httpService.deleteRequest(`systemParameter/${id}`)
      .pipe(map((data: SystemParameter) => {
        return data;
      }))
  }

  AssignVehicle(data: any) {
    return this.httpService.postRequest(`systemParameter/assignVehicle`, data)
      .pipe(map((data: any) => {
        return data;
      }))
  }
}
