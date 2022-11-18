import { SignalrService } from './../../../../Service/signalr.service';
import { VehicleService } from 'src/app/Service/vehicle.service';
import { convertHelper } from 'src/app/utils/helper/convertHelper';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrcustomService } from 'src/app/Interceptor/toastrcustom';
import { lstOrderOperating } from 'src/app/Model/OrderOperating';
import { Pagination } from 'src/app/Model/Table';
import { OrderOperatingService } from 'src/app/Service/orderOperating.service';
import { OrderOperatingCreateComponent } from '../../orderoperating/order-operating-create/order-operating-create.component';
import { lstStep } from 'src/app/utils/helper/constant';
import { Vehicle } from 'src/app/Model/Vehicle';

@Component({
  selector: 'app-enter-exit-index',
  templateUrl: './enter-exit-index.component.html',
  styleUrls: ['./enter-exit-index.component.css']
})
export class EnterExitIndexComponent implements OnInit {

  loading: boolean = false;
  selected: number = 0;
  lstdata: lstOrderOperating = {
    currentPage: 0,
    pageSize: 0,
    totalRecord: 0,
    totalPage: 0,
    data: []
  };

  Pagination: Pagination = {
    currentPage: 0,
    pageSize: 0,
    totalRecord: 0,
    totalPage: 0,
  }

    PageInfo = {
    page: 1,
    Keyword: '',
    pageSize: 10,
    deliveryCode: '',
    step: '2'
  }

  constructor(private orderOperatingService: OrderOperatingService,
    private vehicleService: VehicleService,
    private signalrService: SignalrService,
    public dialog: MatDialog,
    public convertHelper: convertHelper,
    private toastr: ToastrcustomService) { }

  ngOnInit(): void {
    this.Pagingdata(this.PageInfo);
    this.signalrService.hubMessage.subscribe((hubMessage: string) => {
      this.getVehicle(hubMessage);
    });
  }

  Pagingdata(PageInfo: any) {
    this.loading = true;
    this.orderOperatingService.Paging(this.PageInfo.page, this.PageInfo.Keyword, this.PageInfo.pageSize, this.PageInfo.deliveryCode, this.PageInfo.step).subscribe(data => {
      this.lstdata = data;
      this.loading = false;
      this.Pagination.currentPage = data.currentPage,
        this.Pagination.pageSize = data.pageSize,
        this.Pagination.totalPage = data.totalPage,
        this.Pagination.totalRecord = data.totalRecord
    })
  }

  getVehicle(hubMessage: any) {
    setTimeout(() => {
      if (!hubMessage) {
        return;
      }
      hubMessage = JSON.parse(hubMessage);
      if (hubMessage.FromService === 'CV') {
        this.orderOperatingService.GetOrderByCode(hubMessage.DeliveryCode).subscribe(res => {
          if (res.statusCode == 200) {
            this.lstdata.data.pop();
            this.lstdata.data.unshift(res.data);
          } else {
            this.toastr.showError(res.error);
          }
        })
      }
    }, 300)
  }

  myTabSelectedIndexChange(index: number) {
    this.selected = index;
  }

  onChangePage(pageOfItems: any) {
    pageOfItems.Keyword = this.PageInfo.Keyword;
    pageOfItems.deliveryCode = this.PageInfo.deliveryCode;
    pageOfItems.step = this.PageInfo.step;
    this.PageInfo = pageOfItems
    this.Pagingdata(pageOfItems)
  }

}
