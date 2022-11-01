import { lstOrderOperating } from './../Model/OrderOperating';
import { Injectable } from '@angular/core';
import  { CommonserviceService } from  './commonservice.service';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderOperatingService {

  constructor(private httpService: CommonserviceService) { }


  Paging(page:number, searchText:string,numberDis:number) {
    return this.httpService.getRequest('OrderOperating' +'?page='+ page + '&Keyword='+ searchText + '&pageSize='+ numberDis)
      .pipe(map((data : lstOrderOperating) => {
          return data;
      }))
  }

}
