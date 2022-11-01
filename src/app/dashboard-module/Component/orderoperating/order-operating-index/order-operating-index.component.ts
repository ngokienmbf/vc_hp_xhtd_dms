import { OrderOperatingService } from './../../../../Service/orderOperating.service';
import { lstOrderOperating } from './../../../../Model/OrderOperating';
import { Component, OnInit } from '@angular/core';
import { Pagination } from 'src/app/Model/Table';
import { MatDialog } from '@angular/material/dialog';
import { ToastrcustomService } from 'src/app/Interceptor/toastrcustom';

@Component({
  selector: 'app-order-operating-index',
  templateUrl: './order-operating-index.component.html',
  styleUrls: ['./order-operating-index.component.css']
})
export class OrderOperatingIndexComponent implements OnInit {

  isCreate: boolean = true;
  loadding: boolean = false;

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
    pageSize: 10
  }
  constructor(private orderOperatingService: OrderOperatingService,
    public dialog: MatDialog,
    private toastr: ToastrcustomService) { }

  ngOnInit(): void {
    this.Pagingdata(this.PageInfo);
  }

  Pagingdata(PageInfo: any) {
    this.loadding = true;
    this.orderOperatingService.Paging(this.PageInfo.page, this.PageInfo.Keyword, this.PageInfo.pageSize).subscribe(data => {
      console.log(data.data, 'data')
      this.lstdata.data = data.data;
      this.loadding = false;
      this.Pagination.currentPage = data.currentPage,
        this.Pagination.pageSize = data.pageSize,
        this.Pagination.totalPage = data.totalPage,
        this.Pagination.totalRecord = data.totalRecord
      // console.log('this.Pagination',this.Pagination);
    })
  }

  openEdit(id: number) {

  }

  onChangePage(pageOfItems: any) {
    pageOfItems.Keyword = this.PageInfo.Keyword;
    this.PageInfo = pageOfItems
    this.Pagingdata(pageOfItems)
  }




}
