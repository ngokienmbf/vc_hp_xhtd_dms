import { lstRfidSign, rfidSign } from './../Model/RfidSign';
import { RequestService } from './request.service';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RfidSignService {

  constructor(private httpService: RequestService) { }


  Paging(page: number, searchText: string, numberDis: number) {
    return this.httpService.getRequest(`rfidSign?page=${page}&Keyword=${searchText}&pageSize=${numberDis}`)
      .pipe(map((data: lstRfidSign) => {
        return data;
      }))
  }

  GetDetail(id: number) {
    return this.httpService.getRequest(`rfidSign/${id}`)
      .pipe(map((data: rfidSign) => {
        return data;
      }))
  }

  Update(data: any) {
    return this.httpService.putRequest('rfidSign', data)
      .pipe(map((data: any) => {
        return data;
      }))
  }

  Insert(data: any) {
    return this.httpService.postRequest('rfidSign', data)
      .pipe(map((data: any) => {
        return data;
      }))
  }

  Delete(id: number) {
    return this.httpService.deleteRequest(`rfidSign/${id}`)
      .pipe(map((data: rfidSign) => {
        return data;
      }))
  }
}
