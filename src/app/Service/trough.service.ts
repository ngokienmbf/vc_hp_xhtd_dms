import { lstTrough, trough } from './../Model/Trough';
import { RequestService } from './request.service';
import { lstRfid, rfid } from './../Model/Rfid';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TroughService {

  constructor(private httpService: RequestService) { }

  Paging(page: number, searchText: string, numberDis: number) {
    return this.httpService.getRequest(`trough?page=${page}&Keyword=${searchText}&pageSize=${numberDis}`)
      .pipe(map((data: lstTrough) => {
        return data;
      }))
  }

  GetDetail(id: number) {
    return this.httpService.getRequest(`trough/${id}`)
      .pipe(map((data: trough) => {
        return data;
      }))
  }

  Update(data: any) {
    return this.httpService.putRequest('trough', data)
      .pipe(map((data: any) => {
        return data;
      }))
  }

  Insert(data: any) {
    return this.httpService.postRequest('trough', data)
      .pipe(map((data: any) => {
        return data;
      }))
  }

  Delete(id: number) {
    return this.httpService.deleteRequest(`trough/${id}`)
      .pipe(map((data: trough) => {
        return data;
      }))
  }
}
