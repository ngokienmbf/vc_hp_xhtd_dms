import { OrderOperatingService } from './../../../../Service/orderOperating.service';
import { lstOrderOperating } from './../../../../Model/OrderOperating';
import { Component, OnInit } from '@angular/core';
import { Pagination } from 'src/app/Model/Table';
import { MatDialog } from '@angular/material/dialog';
import { ToastrcustomService } from 'src/app/Interceptor/toastrcustom';
import { OrderOperatingCreateComponent } from '../order-operating-create/order-operating-create.component';

@Component({
  selector: 'app-order-operating-index',
  templateUrl: './order-operating-index.component.html',
  styleUrls: ['./order-operating-index.component.css']
})
export class OrderOperatingIndexComponent implements OnInit {

  isCreate: boolean = true;
  loadding: boolean = false;
  options = ['BOOKED', 'RECEIVING'];
  idDetail: number = 0;

  Pagination: Pagination = {
    currentPage: 0,
    pageSize: 0,
    totalRecord: 0,
    totalPage: 0,
  }

  lstdata: lstOrderOperating = {
    currentPage: 0,
    pageSize: 0,
    totalRecord: 0,
    totalPage: 0,
    data: []
  };

  PageInfo = {
    page: 1,
    Keyword: '',
    pageSize: 10,
    deliveryCode: '',
    state: ''
  }
  constructor(private orderOperatingService: OrderOperatingService,
    public dialog: MatDialog,
    private toastr: ToastrcustomService) { }

  ngOnInit(): void {
    this.Pagingdata(this.PageInfo);
  }

  Pagingdata(PageInfo: any) {
    this.loadding = true;
    this.orderOperatingService.Paging(this.PageInfo.page, this.PageInfo.Keyword, this.PageInfo.pageSize, this.PageInfo.deliveryCode, this.PageInfo.state).subscribe(data => {
      this.lstdata = data;
      this.loadding = false;
      this.Pagination.currentPage = data.currentPage,
        this.Pagination.pageSize = data.pageSize,
        this.Pagination.totalPage = data.totalPage,
        this.Pagination.totalRecord = data.totalRecord
    })
  }

  openEdit(id: number) {
    this.isCreate = false;
    this.idDetail = id;
    const dialogRef = this.dialog.open(OrderOperatingCreateComponent);
    dialogRef.componentInstance.createId = this.idDetail;
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

  onChangePage(pageOfItems: any) {
    pageOfItems.Keyword = this.PageInfo.Keyword;
    pageOfItems.deliveryCode = this.PageInfo.deliveryCode;
    pageOfItems.state = this.PageInfo.state;
    this.PageInfo = pageOfItems
    this.Pagingdata(pageOfItems)
  }
  searchVehicle(e: any) {
    this.PageInfo.Keyword = e;
    this.PageInfo.page = 1;
    this.Pagingdata(this.PageInfo);
  }

  searchDeliverCode(e: any) {
    this.PageInfo.deliveryCode = e;
    this.PageInfo.page = 1;
    this.Pagingdata(this.PageInfo);
  }

  searchState(e: any) {
    this.PageInfo.state = e;
    this.PageInfo.page = 1;
    this.Pagingdata(this.PageInfo);
  }

  resetFilter() {
    this.PageInfo = {
      page: 1,
      Keyword: '',
      pageSize: 10,
      deliveryCode: '',
      state: ''
    }
    this.Pagingdata(this.PageInfo);
  }

  exportReport() {
    return this.orderOperatingService.ExportReport(this.PageInfo.page, this.PageInfo.Keyword, this.PageInfo.pageSize, this.PageInfo.deliveryCode, this.PageInfo.state)
      .subscribe((result: Blob) => {
        const blob = new Blob([result], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" }); // you can change the type
        const url = window.URL.createObjectURL(blob);
        window.open(url);
        console.log("Success");
      });
  }
}
