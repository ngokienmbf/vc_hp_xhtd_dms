import { lstOrderOperating, OrderOperating } from './../Model/OrderOperating';
import { Injectable } from '@angular/core';
import { RequestService } from './request.service';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderOperatingService {

  constructor(private httpService: RequestService) { }


  Paging(page: number, searchText: string, numberDis: number, deliveryCode: string, step: string) {
    return this.httpService.getRequest(`OrderOperating?page=${page}&Keyword=${searchText}&pageSize=${numberDis}&deliveryCode=${deliveryCode}&step=${step}`)
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

  ExportReport(typeReport: string) {
    return this.httpService.downloadRequest(`OrderOperating/exportReport?typeReport=${typeReport}`)
  }

  GetOrderByCode(deliveryCode: string) {
    return this.httpService.getRequest(`OrderOperating/getOrderByCode?code=${deliveryCode}`)
  }

  acceptOrder(data: any) {
    return this.httpService.postRequest(`acceptOrder`, data)
  }

  cancelOrder(data: any) {
    return this.httpService.postRequest(`cancelOrder`, data)
  }

}
