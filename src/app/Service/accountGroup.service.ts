import { Injectable } from '@angular/core';
import { RequestService } from  './request.service';
import { map, Observable } from 'rxjs';
import { AccountGroup, lstAccountGroup } from 'src/app/Model/AccountGroup';
import { Item } from '../Model/multidropdown';

@Injectable({
  providedIn: 'root'
})


export class AccountGroupService {

  constructor(private httpService: RequestService) { }


  Paging(page: number, searchText: string, numberDis: number) {
    return this.httpService.getRequest(`accountGroup?page=${page}&Keyword=${searchText}&pageSize=${numberDis}`)
      .pipe(map((data: lstAccountGroup) => {
        return data;
      }))
  }

  GetDetail(id: number) {
    return this.httpService.getRequest(`accountGroup/${id}`)
      .pipe(map((data: AccountGroup) => {
        return data;
      }))
  }

  GetFull() { // for dropdowns only
    return this.httpService.getRequest(`accountGroup/GetFull`)
    .pipe(map((data : any) => {
      return data.map((i : any) => ({
        id: i.id,
        name:  i.id.toString(),
        title: i.name
      } as Item)) as Item[];
    }));
  }

  Update(data: any) {
    return this.httpService.putRequest('accountGroup', data)
      .pipe(map((data: any) => {
        return data;
      }))
  }

  Insert(data: any) {
    return this.httpService.postRequest('accountGroup', data)
      .pipe(map((data: any) => {
        return data;
      }))
  }

  Delete(id: number) {
    return this.httpService.deleteRequest(`accountGroup/${id}`)
      .pipe(map((data: AccountGroup) => {
        return data;
      }))
  }


}
