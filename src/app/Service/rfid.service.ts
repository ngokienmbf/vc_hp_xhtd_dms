import { RequestService } from './request.service';
import { lstRfid, rfid } from './../Model/Rfid';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RfidService {

  constructor(private httpService: RequestService) { }


  Paging(page: number, searchText: string, numberDis: number) {
    return this.httpService.getRequest(`rfid?page=${page}&Keyword=${searchText}&pageSize=${numberDis}`)
      .pipe(map((data: lstRfid) => {
        return data;
      }))
  }

  GetDetail(id: number) {
    return this.httpService.getRequest(`rfid/${id}`)
      .pipe(map((data: rfid) => {
        return data;
      }))
  }

  Update(data: any) {
    return this.httpService.putRequest('rfid', data)
      .pipe(map((data: any) => {
        return data;
      }))
  }

  Insert(data: any) {
    return this.httpService.postRequest('rfid', data)
      .pipe(map((data: any) => {
        return data;
      }))
  }

  Delete(id: number) {
    return this.httpService.deleteRequest(`rfid/${id}`)
      .pipe(map((data: rfid) => {
        return data;
      }))
  }
}
