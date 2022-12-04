import { lstDriverVehicle } from './../../../../Model/DriverVehicle';
import { DriverVehicleService } from 'src/app/Service/drivervehicle.service';
import { OrderOperatingService } from 'src/app/Service/orderOperating.service';
import { lstDriver } from './../../../../Model/Driver';
import { Component, OnInit } from '@angular/core';
import { Pagination } from 'src/app/Model/Table';
import { DriverService } from 'src/app/Service/driver.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-driver-dialog',
  templateUrl: './driver-dialog.component.html',
  styleUrls: ['./driver-dialog.component.css']
})
export class DriverDialogComponent implements OnInit {
  loading: boolean = true;
  lstdata: lstDriverVehicle = {
    currentPage: 0,
    pageSize: 0,
    totalRecord: 0,
    totalPage: 0,
    data: []
  };
  itemSelected: string = '';
  contImageId: number = 0;
  orderSelected: any = null;
  Pagination: Pagination = {
    currentPage: 0,
    pageSize: 0,
    totalRecord: 0,
    totalPage: 0,
  };

  PageInfo = {
    page: 1,
    Keyword: '',
    pageSize: 10,
    startDate: '',
    endDate: ''
  }
  constructor(private driverVehicleService: DriverVehicleService,
    private orderOperating: OrderOperatingService,
    public dialogRef: MatDialogRef<DriverDialogComponent>) {

  }

  ngOnInit(): void {
    this.Pagingdata(this.PageInfo)
  }

  Pagingdata(PageInfo: any) {
    this.loading = true;
    this.driverVehicleService.GetDriverByVehicle(this.orderSelected.vehicle, this.PageInfo.page, this.PageInfo.Keyword, this.PageInfo.pageSize).subscribe(data => {
      this.loading = false;
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

  handleSubmit() {
    this.loading = true;
    this.orderOperating.acceptOrder({ id: this.orderSelected?.id, driverUserName: this.itemSelected }).subscribe(res => this.dialogRef.close(res));
  }

  hanldeClickItem(item: string) {
    this.itemSelected = item;
  }

  closeDialog() {
    this.dialogRef.close()
  }

}
