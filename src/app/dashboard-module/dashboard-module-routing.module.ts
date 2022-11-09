import { RfidIndexComponent } from './Component/RFID/rfid-index/rfid-index.component';
import { OrderOperatingIndexComponent } from './Component/orderoperating/order-operating-index/order-operating-index.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Component/home/home.component';

import { TaikhoanComponent } from './Component/taikhoan/taikhoan.component';
import { ExampleComponent } from './Component/example/example.component'
import { SettingIndexComponent } from './Component/setting/setting-index/setting-index.component';
import { VehicleIndexComponent } from './Component/vehicle/vehicle-index/vehicle-index.component';
import { DeviceIndexComponent } from './Component/device/device-index/device-index.component';
import { CategoryIndexComponent } from './Component/device/category-index/category-index.component';
import { DeviceTabsComponent } from './Component/device/device-tabs.component';
import { DriverIndexComponent } from './Component/driver/driver-index/driver-index.component';
import { DriverVehicleIndexComponent } from './Component/driver-vehicle/driver-vehicle-index/driver-vehicle-index.component';
import { QLTaiKhoanIndexComponent } from './Component/quan-ly-tai-khoan/tai-khoan-index/tai-khoan-index.component';

import { RoleGuardService } from '../Interceptor//rolo.guard.service'
import { NotfoundComponent } from './Component/notfound/notfound.component';
import { QuanTriHeThongComponent } from './Component/quan-tri-he-thong/quan-tri-he-thong.component';
import { DeviceBoardComponent } from './Component/device/device-board/device-board.component';


const routes: Routes = [
{
    path: '', component: HomeComponent,
    children: [
      { path: 'tai-khoan', component: TaikhoanComponent },
      {path: 'example',component: ExampleComponent },

      // quan ly
      { path: 'lai-xe', component: DriverIndexComponent },
      { path: 'phuong-tien', component: VehicleIndexComponent },     
      { path: 'lai-xe-phuong-tien', component: DriverVehicleIndexComponent },

      // danh muc
      { path: 'ds-thiet-bi', component: DeviceBoardComponent},
      { path: 'rfid', component: RfidIndexComponent},
      { path: 'setting', component: SettingIndexComponent },
      { path: '404-not-found', component: NotfoundComponent },


      // Quản trị hệ thống
      { path: 'quan-ly-tai-khoan', component: QLTaiKhoanIndexComponent },
      { path: 'quan-ly-he-thong', component: QuanTriHeThongComponent},
      { path: 'don-hang', component: OrderOperatingIndexComponent},
      { path: 'thiet-bi', component: DeviceTabsComponent,
        children: [
          { path: '', component: DeviceIndexComponent},
          { path: 'list', component: DeviceIndexComponent},
          { path: 'hang-muc', component: CategoryIndexComponent },
        ]
      },
    ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardModuleRoutingModule { }
