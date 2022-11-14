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

  isCreate: boolean = true;
  loadding: boolean = false;
  options = lstStep;
  idDetail: number = 0;
  selected: number = 0;
  lstdata: any[] = [] ;

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
    state: ''
  }
  constructor(private orderOperatingService: OrderOperatingService,
    private vehicleService: VehicleService,
    private signalrService: SignalrService,
    public dialog: MatDialog,
    public convertHelper: convertHelper,
    private toastr: ToastrcustomService) { }

  ngOnInit(): void {
    this.signalrService.hubMessage.subscribe((hubMessage: string) => {
      this.getVehicle(hubMessage);
    });
  }

  getVehicle(hubMessage: any) {
    setTimeout(() => {
      if (!hubMessage) {
        return;
      }
      hubMessage = JSON.parse(hubMessage);
      if (hubMessage.FromService === 'CV') {
        this.loadding = true;
        this.vehicleService.GetByLP(hubMessage.Vehicle).subscribe(data => {
          this.lstdata.unshift(data);
          this.loadding = false;
        })
      }
    }, 300)
  }

  myTabSelectedIndexChange(index: number) {
    this.selected = index;
  }

}
