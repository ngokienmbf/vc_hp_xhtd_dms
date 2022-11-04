import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';

//Thư viện
// import {MatMenuModule} from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTreeModule } from '@angular/material/tree';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DashboardModuleRoutingModule } from './dashboard-module-routing.module';

//custom common
import { AutocompleteComponent } from './../View/autocomplete/autocomplete.component';
import { LoadingComponent } from '../View/loading/loading.component';
import { MultidropdownComponent } from '../View/multidropdown/multidropdown.component';
import { PaginationComponent } from '../View/pagination/pagination.component';

// authen/example
import { ExampleComponent } from './Component/example/example.component';
import { NotfoundComponent } from './Component/notfound/notfound.component';

//Component
import { HomeComponent } from './Component/home/home.component';
import { SidebarComponent } from './Component/sidebar/sidebar/sidebar.component';
import { TaikhoanComponent } from './Component/taikhoan/taikhoan.component';

// Quan ly
import { DriverCreateComponent } from './Component/driver/driver-create/driver-create.component';
import { DriverDeleteComponent } from './Component/driver/driver-delete/driver-delete.component';
import { DriverIndexComponent } from './Component/driver/driver-index/driver-index.component';

import { VehicleCreateComponent } from './Component/vehicle/vehicle-create/vehicle-create.component';
import { VehicleDeleteComponent } from './Component/vehicle/vehicle-delete/vehicle-delete.component';
import { VehicleIndexComponent } from './Component/vehicle/vehicle-index/vehicle-index.component';

//Danh muc
import { DeviceCreateComponent } from './Component/device/device-create/device-create.component';
import { DeviceDeleteComponent } from './Component/device/device-delete/device-delete.component';
import { DeviceIndexComponent } from './Component/device/device-index/device-index.component';

// Quan ly he thong
import { QLTaiKhoanCreateComponent } from './Component/quan-ly-tai-khoan/tai-khoan-create/tai-khoan-create.component';
import { QLTaiKhoanDeleteComponent } from './Component/quan-ly-tai-khoan/tai-khoan-delete/tai-khoan-delete.component';
import { QLTaiKhoanIndexComponent } from './Component/quan-ly-tai-khoan/tai-khoan-index/tai-khoan-index.component';
import { UserAuthorizationComponent } from './Component/quan-ly-tai-khoan/user-authorization/user-authorization.component';
import { QuanTriHeThongComponent } from './Component/quan-tri-he-thong/quan-tri-he-thong.component';
import { RolePermissionComponent } from './Component/quan-tri-he-thong/role-permission/role-permission.component';
import { SettingIndexComponent } from './Component/setting/setting-index/setting-index.component';
import { OrderOperatingIndexComponent } from './Component/orderoperating/order-operating-index/order-operating-index.component';
import { RfidIndexComponent } from './Component/RFID/rfid-index/rfid-index.component';
import { RfidCreateComponent } from './Component/RFID/rfid-create/rfid-create.component';
import { RfidDeleteComponent } from './Component/RFID/rfid-delete/rfid-delete.component';

import { DriverVehicleIndexComponent } from './Component/driver-vehicle/driver-vehicle-index/driver-vehicle-index.component';
import { DriverVehicleCreateComponent } from './Component/driver-vehicle/driver-vehicle-create/driver-vehicle-create.component';
import { DriverVehicleDeleteComponent } from './Component/driver-vehicle/driver-vehicle-delete/driver-vehicle-delete.component';
import { RfidDialogComponent } from './Component/RFID/rfid-dialog/rfid-dialog.component';
1

@NgModule({
  declarations: [
    HomeComponent,
    //view
    PaginationComponent,
    AutocompleteComponent,
    MultidropdownComponent,
    SidebarComponent,
    LoadingComponent,
    NotfoundComponent,
    ExampleComponent,

    DriverCreateComponent,
    DriverDeleteComponent,
    DriverIndexComponent,
    VehicleCreateComponent,
    VehicleDeleteComponent,
    VehicleIndexComponent,

    DeviceCreateComponent,
    DeviceDeleteComponent,
    DeviceIndexComponent,
    SettingIndexComponent,

    UserAuthorizationComponent,
    QLTaiKhoanCreateComponent,
    QLTaiKhoanDeleteComponent,
    QLTaiKhoanIndexComponent,
    QuanTriHeThongComponent,
    RolePermissionComponent,
    TaikhoanComponent,
    OrderOperatingIndexComponent,
    RfidIndexComponent,
    RfidCreateComponent,
    RfidDeleteComponent ,
    DriverVehicleIndexComponent,
    DriverVehicleCreateComponent,
    DriverVehicleDeleteComponent,
    RfidDialogComponent,


  ],
  imports: [
    CommonModule,
    DashboardModuleRoutingModule,
    MatSidenavModule,
    MatIconModule,
    MatCardModule,
    MatToolbarModule,
    MatListModule,
    MatTreeModule,
    MatMenuModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule
    // ToastrModule.forRoot()
  ],
})
export class DashboardModuleModule { }
