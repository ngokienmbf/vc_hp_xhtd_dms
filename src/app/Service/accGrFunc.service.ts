import { Injectable } from '@angular/core';
import  { RequestService } from  './request.service';
import { map, Observable } from 'rxjs';
import { AccGrFunc, lstAccGrFunc } from 'src/app/Model/AccGrFunc';
import { Item } from '../Model/multidropdown';

@Injectable({
  providedIn: 'root'
})


export class AccGrFuncService {

  constructor(private httpService: RequestService) { }


  Paging(page: number, searchText: string, numberDis: number) {
    return this.httpService.getRequest(`accountGroupFunction?page=${page}&Keyword=${searchText}&pageSize=${numberDis}`)
      .pipe(map((data: lstAccGrFunc) => {
        return data;
      }))
  }

  GetDetail(id: number) {
    return this.httpService.getRequest(`accountGroupFunction/${id}`)
      .pipe(map((data: AccGrFunc) => {
        return data;
      }))
  }

  Update(data: any) {
    return this.httpService.putRequest('accountGroupFunction', data)
      .pipe(map((data: any) => {
        return data;
      }))
  }

  Insert(data: any) {
    return this.httpService.postRequest('accountGroupFunction', data)
      .pipe(map((data: any) => {
        return data;
      }))
  }

  Delete(id: number) {
    return this.httpService.deleteRequest(`accountGroupFunction/${id}`)
      .pipe(map((data: AccGrFunc) => {
        return data;
      }))
  }

  
  GetFullFunctions() { // for dropdowns only
    return this.httpService.getRequest(`accountGroupFunction/GetFullFunctions`)
    .pipe(map((data : any) => {
      return data.map((i : any) => ({
        id: i.id,
        name:  i.id.toString(),
        title: i.name
      } as Item)) as Item[];
    }));
  }

}
