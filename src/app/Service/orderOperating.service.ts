import { lstOrderOperating, OrderOperating } from './../Model/OrderOperating';
import { Injectable } from '@angular/core';
import { RequestService } from './request.service';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderOperatingService {

  constructor(private httpService: RequestService) { }


  Paging(page: number, searchText: string, numberDis: number, deliveryCode: string, state: string) {
    return this.httpService.getRequest(`OrderOperating?page=${page}&Keyword=${searchText}&pageSize=${numberDis}&deliveryCode=${deliveryCode}&state=${state}`)
      .pipe(map((data: lstOrderOperating) => {
        return data;
      }))
  }

  GetDetail(id: number) {
    return this.httpService.getRequest(`OrderOperating/${id}`)
      .pipe(map((data: OrderOperating) => {
        return data;
      }))
  }

  Update(data: any) {
    return this.httpService.putRequest('OrderOperating', data)
      .pipe(map((data: any) => {
        return data;
      }))
  }


}
