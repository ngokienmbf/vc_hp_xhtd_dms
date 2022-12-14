import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../../Service/account.service'
import { Router } from '@angular/router';
import { ToastrcustomService } from '../../../Interceptor/toastrcustom';

@Component({
  selector: 'app-verifycode',
  templateUrl: './verifycode.component.html',
  styleUrls: ['./verifycode.component.css']
})
export class VerifycodeComponent implements OnInit {
  code : string = "";
  loading: boolean = false;

  constructor(private accountservice : AccountService,private router : Router,private toastr: ToastrcustomService) { }

  ngOnInit(): void {
  }


  sendCode() {
    this.loading = true;

    var stringToObj = JSON.parse(String(localStorage.getItem('emailInfo')));
    var obj = {
      email : stringToObj,
      code : this.code
    }
    this.accountservice.sendCode(obj).subscribe(response => {
    this.loading = false;
    console.log(response)
      if(response.jwt != null){
        localStorage.setItem("UserInfo", JSON.stringify(response));
        this.router.navigate(['/Home/taikhoan']);
      }else{
        this.toastr.showError('Code không chính xác !!!');
      }
    })

  }

}
