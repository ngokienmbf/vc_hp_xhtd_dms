import { convertHelper } from 'src/app/utils/helper/convertHelper';
import { SignalrService } from '../../../../Service/signalr.service';
import { OrderOperatingService } from '../../../../Service/orderOperating.service';
import { lstOrderOperating } from '../../../../Model/OrderOperating';
import { Component, Input, OnInit } from '@angular/core';
import { Pagination } from 'src/app/Model/Table';
import { MatDialog } from '@angular/material/dialog';
import { ToastrcustomService } from 'src/app/Interceptor/toastrcustom';
import { OrderOperatingCreateComponent } from '../order-operating-create/order-operating-create.component';
import { lstStep } from 'src/app/utils/helper/constant';

@Component({
  selector: 'app-order-operating-list',
  templateUrl: './order-operating-list.component.html',
  styleUrls: ['./order-operating-list.component.css']
})
export class OrderOperatingListComponent implements OnInit {
  @Input() showType!: string;
  isCreate: boolean = true;
  loadding: boolean = false;
  options = lstStep;
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
    step: ''
  }
  constructor(private orderOperatingService: OrderOperatingService,
    private signalrService: SignalrService,
    public dialog: MatDialog,
    private toastr: ToastrcustomService,
    public convertHelper: convertHelper
  ) { }

  ngOnInit(): void {
    this.Pagingdata(this.PageInfo);

    this.signalrService.hubMessage.subscribe((hubMessage: string) => {
      this.reloadData(hubMessage);
    });
  }

  Pagingdata(PageInfo: any) {
    this.loadding = true;
    this.orderOperatingService.Paging(this.PageInfo.page, this.PageInfo.Keyword, this.PageInfo.pageSize, this.PageInfo.deliveryCode, this.PageInfo.step).subscribe(data => {
      this.lstdata = data;
      this.loadding = false;
      this.Pagination.currentPage = data.currentPage,
        this.Pagination.pageSize = data.pageSize,
        this.Pagination.totalPage = data.totalPage,
        this.Pagination.totalRecord = data.totalRecord
    })
  }

  reloadData(hubMessage: any) {
    setTimeout(() => {
      if (!hubMessage) {
        return;
      }
      hubMessage = JSON.parse(hubMessage);
      if (hubMessage.FromService === 'SYNC_ORDER') {
        this.Pagingdata(this.PageInfo)
      }
    }, 300)
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
    pageOfItems.step = this.PageInfo.step;
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

  searchStep(e: any) {
    this.PageInfo.step = e;
    this.PageInfo.page = 1;
    this.Pagingdata(this.PageInfo);
  }

  resetFilter() {
    this.PageInfo = {
      page: 1,
      Keyword: '',
      pageSize: 10,
      deliveryCode: '',
      step: ''
    }
    this.Pagingdata(this.PageInfo);
  }

  exportReport() {
    return this.orderOperatingService.ExportReport(this.PageInfo.page,
      this.PageInfo.Keyword, this.PageInfo.pageSize, this.PageInfo.deliveryCode, this.PageInfo.step)
      .subscribe((result: Blob) => {
        const blob = new Blob([result], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" }); // you can change the type
        const url = window.URL.createObjectURL(blob);
        window.open(url);
        console.log("Success");
      });
  }
}