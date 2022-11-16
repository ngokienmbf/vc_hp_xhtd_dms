import { Component, OnInit } from '@angular/core';
import { Pagination } from '../../../../Model/Table';
import { MatDialog } from '@angular/material/dialog';
import { lstDriverVehicle, DriverVehicle } from 'src/app/Model/DriverVehicle';
import { DriverVehicleService } from 'src/app/Service/drivervehicle.service';
import { convertHelper } from 'src/app/utils/helper/convertHelper';
import { ToastrcustomService } from '../../../../Interceptor/toastrcustom';
import { DriverVehicleCreateComponent } from '../driver-vehicle-create/driver-vehicle-create.component';
import { DriverVehicleDeleteComponent } from '../driver-vehicle-delete/driver-vehicle-delete.component';

@Component({
  selector: 'app-driver-vehicle-index',
  templateUrl: './driver-vehicle-index.component.html',
})
export class DriverVehicleIndexComponent implements OnInit {
  isCreate : boolean = true;
  customerId : number = 0;
  loading: boolean = false;

  Pagination: Pagination = {
    currentPage : 0,
    pageSize : 0,
    totalRecord : 0,
    totalPage : 0,
  }

  lstdata : lstDriverVehicle = {
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

  constructor(private DriverVehicleService : DriverVehicleService,
    public dialog: MatDialog,
    private toastr : ToastrcustomService,
    public convertHelper: convertHelper) { }

  ngOnInit(): void {
    this.Pagingdata(this.PageInfo);
  }

  Pagingdata(PageInfo : any)  {
    this.loading = true;
     this.DriverVehicleService.Paging(this.PageInfo.page,this.PageInfo.Keyword,this.PageInfo.pageSize).subscribe(data => {
      this.loading = false;
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
    const dialogRef = this.dialog.open(DriverVehicleCreateComponent,{
      height: '500px',width: '500px',
  });
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
    const dialogRef = this.dialog.open(DriverVehicleCreateComponent,{
      height: '500px',width: '500px',
  });
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
    const dialogRef = this.dialog.open(DriverVehicleDeleteComponent);
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
