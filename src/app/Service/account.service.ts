import { Injectable } from '@angular/core';
import { RequestService } from  './request.service';
import { UserLogin,UserReponse } from '../Model/User'
import { map, Observable } from 'rxjs';
import {Item} from '../Model/multidropdown'
import { Account, lstAccount } from 'src/app/Model/Account';

@Injectable({
  providedIn: 'root'
})


export class AccountService {

  constructor(private httpService: RequestService) { }

  Login(User: UserLogin) {
    return this.httpService.postRequest('Account/Login', User)
    .pipe(map((data : UserReponse) => {
        if(data) {
          localStorage.setItem('UserInfo', JSON.stringify(data));
        }
        return data;
    }))
  };
  // refreshToken()

  sendEmailorPhone(emailOrPhone : string){
    return this.httpService.postRequest('Account/ResendCode',{emailOrPhone : emailOrPhone})
  }

  sendCode(data : any) {
    return this.httpService.postRequest('Account/VerifyCode',data);
  }


  getAccountInfo(){
    return this.httpService.getRequest('Account/GetUserProfile');
  }

  updateAvatar(data : any) {
    return this.httpService.postRequest('Account/updateAvatar',data);
  }

  getUserInfo() {
    const UserInfo =  JSON.parse(localStorage.getItem('UserInfo') || 'null');
    return UserInfo;
  }


  // hàm check quyền
  checkAllowFunction(functionId: number) {
    var UserInfo =  JSON.parse(localStorage.getItem('UserInfo') || 'null');
    var groupFunctions = UserInfo.groupFunctions || [];
    //console.log(groupFunctions);
    
    return groupFunctions.filter((el:any) => { return el.functionId == functionId;
    });
  }

  updateUser(data : any) {
    return this.httpService.postRequest('Account/UpdateUserProfile', data)
  }

  changPassword(data : any){
    return this.httpService.postRequest('Account/SetPassword',data);
  }

  logOut(){
    localStorage.removeItem('UserInfo');
  }

  getListSelectMulti(){
    return this.httpService.getRequest('admin/ManageAccount')
    .pipe(map((data : any) => {
        return data.map((i : any) => ({
          id: i.id,
          name: i.fullName
        } as Item)) as Item[];
    }))
  }

  refreshToken(data : any){
    return this.httpService.postRequest('Account/RefreshToken',data)
  }

  //--------------------

  Paging(page: number, searchText: string, numberDis: number) {
    return this.httpService.getRequest(`account?page=${page}&Keyword=${searchText}&pageSize=${numberDis}`)
      .pipe(map((data: lstAccount) => {
        return data;
      }))
  }

  GetDetail(id: number) {
    return this.httpService.getRequest(`account/${id}`)
      .pipe(map((data: Account) => {
        return data;
      }))
  }

  Update(data: any) {
    return this.httpService.putRequest('account', data)
      .pipe(map((data: any) => {
        return data;
      }))
  }

  Insert(data: any) {
    return this.httpService.postRequest('account', data)
      .pipe(map((data: any) => {
        return data;
      }))
  }

  Delete(id: number) {
    return this.httpService.deleteRequest(`account/${id}`)
      .pipe(map((data: Account) => {
        return data;
      }))
  }

  ResetPassword(id: number) {
    return this.httpService.putRequest('account/ResetPassword', id)
      .pipe(map((data: Account) => {
        return data;
      }))
  }
  getTokenMb() {
    const token =  JSON.parse(localStorage.getItem('token') || 'null');
    return token;
  }

  Login2(User: UserLogin) {
    return this.httpService.postRequestFromMb('token', User)
    .pipe(map((data : any) => {
        if(data) {
          localStorage.setItem('token', JSON.stringify(data.access_token));
        }
        return data;
    }))
  };
}
