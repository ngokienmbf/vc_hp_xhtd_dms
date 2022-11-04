import { rfid } from './../../../../Model/Rfid';
import { RfidDialogComponent } from './../rfid-dialog/rfid-dialog.component';
import { RfidCreateComponent } from './../rfid-create/rfid-create.component';
import { RfidDeleteComponent } from './../rfid-delete/rfid-delete.component';
import { RfidService } from './../../../../Service/rfid.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrcustomService } from 'src/app/Interceptor/toastrcustom';
import { Pagination } from 'src/app/Model/Table';
import { lstRfid } from 'src/app/Model/Rfid';

@Component({
  selector: 'app-rfid-index',
  templateUrl: './rfid-index.component.html',
  styleUrls: ['./rfid-index.component.css']
})
export class RfidIndexComponent implements OnInit {

  isCreate: boolean = true;
  idDelete: number = 0;
  createId: number = 0;
  loadding: boolean = false;

  Pagination: Pagination = {
    currentPage: 0,
    pageSize: 0,
    totalRecord: 0,
    totalPage: 0,
  }

  lstdata: lstRfid = {
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
  constructor(private rfidService: RfidService,
    public dialog: MatDialog,
    private toastr: ToastrcustomService,
  ) { }

  ngOnInit(): void {
    this.Pagingdata(this.PageInfo);
  }

  Pagingdata(PageInfo: any) {
    this.loadding = true;
    this.rfidService.Paging(this.PageInfo.page, this.PageInfo.Keyword, this.PageInfo.pageSize).subscribe(data => {
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

  openDelete(id: number) {
    this.idDelete = id;
    const dialogRef = this.dialog.open(RfidDeleteComponent);
    dialogRef.componentInstance.idDelete = this.idDelete;
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.statusCode === 200) {
          this.toastr.showSuccess(result.message);
          this.Pagingdata(this.PageInfo);
        }
        else {
          this.toastr.showError(result.message);
        }
      }
    });
  }

  openCreate() {
    const dialogRef = this.dialog.open(RfidCreateComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.statusCode === 200) {
          this.toastr.showSuccess(result.message);
          this.Pagingdata(this.PageInfo);
        }
        else {
          this.toastr.showError(result.message);
        }
      }
    });
  }

  openEdit(id: number) {
    this.isCreate = false;
    this.createId = id;
    const dialogRef = this.dialog.open(RfidCreateComponent);
    dialogRef.componentInstance.createId = this.createId;
    dialogRef.componentInstance.isCreate = this.isCreate;
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.statusCode === 200) {
          this.toastr.showSuccess(result.message);
          this.Pagingdata(this.PageInfo);
        }
        else {
          this.toastr.showError(result.message);
        }
      }
    })
  }

  showVehicles(item: rfid) {
    const dialogRef = this.dialog.open(RfidDialogComponent);
    dialogRef.componentInstance.rfidSelected = item;
    dialogRef.afterClosed().subscribe(result => {
      console.log(result,'result')
      if (result) {
        if (result.statusCode === 200) {
          this.toastr.showSuccess(result.message);
          this.Pagingdata(this.PageInfo);
        }
        else {
          this.toastr.showError(result.message);
        }
      }
    })
  }

}
