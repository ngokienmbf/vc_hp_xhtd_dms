import { Component, OnInit } from '@angular/core';
import { Pagination } from '../../../../Model/Table';
import { MatDialog } from '@angular/material/dialog';
import { lstAccGrFunc, AccGrFunc } from 'src/app/Model/AccGrFunc';
import { AccGrFuncService } from 'src/app/Service/accGrFunc.service';
import { convertHelper } from 'src/app/utils/helper/convertHelper';
import { ToastrcustomService } from '../../../../Interceptor/toastrcustom';
import { AccGrFuncCreateComponent } from '../group-function-create/group-function-create.component';
import { AccGrFuncDeleteComponent } from '../group-function-delete/group-function-delete.component';

@Component({
  selector: 'app-group-function-index',
  templateUrl: './group-function-index.component.html',
})
export class AccGrFuncIndexComponent implements OnInit {
  isCreate : boolean = true;
  customerId : number = 0;
  loadding: boolean = false;

  Pagination: Pagination = {
    currentPage : 0,
    pageSize : 0,
    totalRecord : 0,
    totalPage : 0,
  }

  lstdata : lstAccGrFunc = {
    currentPage : 0,
    pageSize : 0,
    totalRecord : 0,
    totalPage : 0,
    data : []
  };

  PageInfo = {
    page : 1,
    Keyword : '',
    pageSize : 10
  }
  
  constructor(private AccGrFuncService : AccGrFuncService,
    public dialog: MatDialog,
    private toastr : ToastrcustomService,
    public convertHelper: convertHelper) { }

  ngOnInit(): void {
    this.Pagingdata(this.PageInfo);
  }

  Pagingdata(PageInfo : any)  {
    this.loadding = true;
     this.AccGrFuncService.Paging(this.PageInfo.page,this.PageInfo.Keyword,this.PageInfo.pageSize).subscribe(data => {
      this.loadding = false;
      this.lstdata = data;
      this.Pagination.currentPage = data.currentPage,
      this.Pagination.pageSize = data.pageSize,
      this.Pagination.totalPage = data.totalPage,
      this.Pagination.totalRecord = data.totalRecord
      // console.log('this.Pagination',this.Pagination);
     })
  }

  onChangePage(pageOfItems: any) {
    pageOfItems.Keyword = this.PageInfo.Keyword;
    this.PageInfo = pageOfItems
    this.Pagingdata(pageOfItems)
  }
  
  onSearch(e:any)
  {
    this.PageInfo.Keyword = e;
    this.PageInfo.page = 1;
    this.Pagingdata(this.PageInfo);
  }

  //Create
  openEdit(id: number){
    this.isCreate = false;
    this.customerId = id;
    const dialogRef = this.dialog.open(AccGrFuncCreateComponent);
    dialogRef.componentInstance.customerId = this.customerId;
    dialogRef.componentInstance.isCreate = this.isCreate;
    dialogRef.afterClosed().subscribe(result => {
      if(result){
          if(result.succeeded === true){
            this.toastr.showSuccess(result.message);
            this.Pagingdata(this.PageInfo);
          }
          else
          {
            this.toastr.showError(result.message);
          }
      }
    })

  }

  openCreate() {
    const dialogRef = this.dialog.open(AccGrFuncCreateComponent);
    dialogRef.afterClosed().subscribe(result => {
        if(result){
          if(result.succeeded === true){
            this.toastr.showSuccess(result.message);
            this.Pagingdata(this.PageInfo);
          }
          else
          {
            this.toastr.showError(result.message);
          }
        }
    });

  }


  openDelete(id: number){
    this.customerId = id;
    const dialogRef = this.dialog.open(AccGrFuncDeleteComponent);
    dialogRef.componentInstance.customerId = this.customerId;
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        if(result.succeeded === true){
          this.toastr.showSuccess(result.message);
          this.Pagingdata(this.PageInfo);
        }
        else
        {
          this.toastr.showError(result.message);
        }
      }
  });
  }
}
