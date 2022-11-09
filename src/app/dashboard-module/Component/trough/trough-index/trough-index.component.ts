import { TroughDeleteComponent } from './../trough-delete/trough-delete.component';
import { TroughCreateComponent } from './../trough-create/trough-create.component';
import { TroughService } from './../../../../Service/trough.service';
import { lstTrough } from './../../../../Model/Trough';
import { Component, OnInit } from '@angular/core';
import { Pagination } from 'src/app/Model/Table';
import { MatDialog } from '@angular/material/dialog';
import { ToastrcustomService } from 'src/app/Interceptor/toastrcustom';

@Component({
  selector: 'app-trough-index',
  templateUrl: './trough-index.component.html',
  styleUrls: ['./trough-index.component.css']
})
export class TroughIndexComponent implements OnInit {

  isCreate: boolean = true;
  customerId: number = 0;
  loadding: boolean = false;

  Pagination: Pagination = {
    currentPage: 0,
    pageSize: 0,
    totalRecord: 0,
    totalPage: 0,
  }

  lstdata: lstTrough = {
    currentPage: 0,
    pageSize: 0,
    totalRecord: 0,
    totalPage: 0,
    data: []
  };

  PageInfo = {
    page: 1,
    Keyword: '',
    pageSize: 10
  }

  constructor(private troughService: TroughService,
    public dialog: MatDialog,
    private toastr: ToastrcustomService,
  ) { }

  ngOnInit(): void {
    this.Pagingdata(this.PageInfo);
  }

  Pagingdata(PageInfo: any) {
    this.loadding = true;
    this.troughService.Paging(this.PageInfo.page, this.PageInfo.Keyword, this.PageInfo.pageSize).subscribe(data => {
      this.loadding = false;
      this.lstdata = data;
      this.Pagination.currentPage = data.currentPage,
        this.Pagination.pageSize = data.pageSize,
        this.Pagination.totalPage = data.totalPage,
        this.Pagination.totalRecord = data.totalRecord
    })
  }


  onChangePage(pageOfItems: any) {
    pageOfItems.Keyword = this.PageInfo.Keyword;
    this.PageInfo = pageOfItems
    this.Pagingdata(pageOfItems)
  }
  onSearch(e: any) {
    this.PageInfo.Keyword = e;
    this.PageInfo.page = 1;
    this.Pagingdata(this.PageInfo);
  }


  //Create

  openEdit(id: number) {
    this.isCreate = false;
    this.customerId = id;
    const dialogRef = this.dialog.open(TroughCreateComponent);
    dialogRef.componentInstance.createId = this.customerId;
    dialogRef.componentInstance.isCreate = this.isCreate;
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.succeeded === true) {
          this.toastr.showSuccess(result.message);
          this.Pagingdata(this.PageInfo);
        }
        else {
          this.toastr.showError(result.message);
        }
      }
    })
  }

  openCreate() {
    const dialogRef = this.dialog.open(TroughCreateComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.succeeded === true) {
          this.toastr.showSuccess(result.message);
          this.Pagingdata(this.PageInfo);
        }
        else {
          this.toastr.showError(result.message);
        }
      }
    });
  }


  openDelete(id: number) {
    this.customerId = id;
    const dialogRef = this.dialog.open(TroughDeleteComponent);
    dialogRef.componentInstance.idDelete = this.customerId;
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.succeeded === true) {
          this.toastr.showSuccess(result.message);
          this.Pagingdata(this.PageInfo);
        }
        else {
          this.toastr.showError(result.message);
        }
      }
    });
  }

}
