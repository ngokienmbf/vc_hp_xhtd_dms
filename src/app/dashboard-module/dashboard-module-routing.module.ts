import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Component/home/home.component';

import { TaikhoanComponent } from './Component/taikhoan/taikhoan.component';
import { ExampleComponent } from './Component/example/example.component'
import { SettingIndexComponent } from './Component/setting/setting-index/setting-index.component';
import { VehicleIndexComponent } from './Component/vehicle/vehicle-index/vehicle-index.component';
import { DeviceIndexComponent } from './Component/device/device-index/device-index.component';
import { DriverIndexComponent } from './Component/driver/driver-index/driver-index.component';
import { QLTaiKhoanIndexComponent } from './Component/quan-ly-tai-khoan/tai-khoan-index/tai-khoan-index.component';

import { RoleGuardService } from '../Interceptor//rolo.guard.service'
import { NotfoundComponent } from './Component/notfound/notfound.component';
import { QuanTriHeThongComponent } from './Component/quan-tri-he-thong/quan-tri-he-thong.component';


const routes: Routes = [
  {
    path: '', component: HomeComponent,
    children: [
      { path: 'tai-khoan', component: TaikhoanComponent },
      {path: 'example',component: ExampleComponent },

      // quan ly
      { path: 'lai-xe', component: DriverIndexComponent },
      { path: 'phuong-tien', component: VehicleIndexComponent },

      // danh muc
      { path: 'thiet-bi', component: DeviceIndexComponent },
      { path: 'setting', component: SettingIndexComponent },
      { path: '404-not-found', component: NotfoundComponent },

      // Quản trị hệ thống
      { path: 'quan-ly-tai-khoan', component: QLTaiKhoanIndexComponent },
      { path: 'quan-ly-he-thong', component: QuanTriHeThongComponent},


      
      // {
      //   path: 'plan-packing', component: PackingBoardComponent,
      //   children: [
      //     { path: '', component: BookingCustomerIndexComponent},
      //     { path: 'list', component: BookingCustomerIndexComponent },
      //     { path: 'template', component: PlanPackingIndexComponent },
      //     { path: 'perform', component: PerformIndexComponent}
      //   ]
      // },
    ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardModuleRoutingModule { }
