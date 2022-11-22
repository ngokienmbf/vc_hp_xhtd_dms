import { WeightStationIndexComponent } from './Component/weight-station/weight-station-index/weight-station-index.component';
import { OrderOperatingIndexComponent } from './Component/orderoperating/order-operating-index/order-operating-index.component';
import { EnterExitIndexComponent } from './Component/enterExit/enter-exit-index/enter-exit-index.component';
import { TroughIndexComponent } from './Component/trough/trough-index/trough-index.component';
import { RfidIndexComponent } from './Component/RFID/rfid-index/rfid-index.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Component/home/home.component';

import { TaikhoanComponent } from './Component/taikhoancanhan/taikhoan.component';
import { ExampleComponent } from './Component/example/example.component'
import { SettingIndexComponent } from './Component/setting/setting-index/setting-index.component';
import { SpIndexComponent } from './Component/system-parameter/sp-index/sp-index.component';
import { VehicleIndexComponent } from './Component/vehicle/vehicle-index/vehicle-index.component';
import { DeviceIndexComponent } from './Component/device/device-index/device-index.component';
import { CategoryIndexComponent } from './Component/device/category-index/category-index.component';
import { DeviceTabsComponent } from './Component/device/device-tabs.component';
import { DriverIndexComponent } from './Component/driver/driver-index/driver-index.component';
import { DriverVehicleIndexComponent } from './Component/driver-vehicle/driver-vehicle-index/driver-vehicle-index.component';

import { RoleGuardService } from '../Interceptor//rolo.guard.service'
import { NotfoundComponent } from './Component/notfound/notfound.component';

import { DeviceBoardComponent } from './Component/device/device-board/device-board.component';
import { DeviceControlComponent } from './Component/device/device-control/device-control.component';
import { OrderOperatingListComponent } from './Component/orderoperating/order-operating-list/order-operating-list.component';

import { AccountIndexComponent } from './Component/account/account-index/account-index.component';
import { AccountGroupTabsComponent } from './Component/account-group/group-tabs.component';
import { AccountGroupIndexComponent } from './Component/account-group/group-index/group-index.component';
import { AccGrFuncIndexComponent } from './Component/account-group/group-function-index/group-function-index.component';


const routes: Routes = [
{
    path: '', component: HomeComponent,
    children: [
      // quan ly
      { path: 'lai-xe', component: DriverIndexComponent },
      { path: 'phuong-tien', component: VehicleIndexComponent },     
      { path: 'lai-xe-phuong-tien', component: DriverVehicleIndexComponent },
      { path: 'dieu-hanh-don', component: OrderOperatingIndexComponent},
      { path: 'quan-ly-vao-ra', component: EnterExitIndexComponent},
      { path: 'quan-ly-tram-can', component: WeightStationIndexComponent},

      // danh muc
      { path: 'ds-thiet-bi', component: DeviceBoardComponent},
      { path: 'rfid', component: RfidIndexComponent},
      { path: 'mang-xuat', component: TroughIndexComponent},
      { path: 'danh-muc-khac', component: NotfoundComponent},

      // Quản trị hệ thống
      { path: 'quan-ly-tai-khoan', component: AccountIndexComponent },
      { path: 'phan-quyen', component: AccountGroupTabsComponent,
          children: [
            { path: '', component: AccountGroupIndexComponent},
            { path: 'nhom', component: AccountGroupIndexComponent},
            { path: 'nhom-quyen', component: AccGrFuncIndexComponent},
          ]
        },
      { path: 'cau-hinh-chung', component: SpIndexComponent },
      { path: 'thiet-bi', component: DeviceTabsComponent,
        children: [
          { path: '', component: DeviceControlComponent},
          { path: 'dieu-khien', component: DeviceControlComponent},
          { path: 'list', component: DeviceIndexComponent},
          { path: 'hang-muc', component: CategoryIndexComponent },
        ]
      },

      // khac/he thong
      { path: '404-not-found', component: NotfoundComponent },
      { path: 'tai-khoan', component: TaikhoanComponent }, // ca nhan
      { path: 'example',component: ExampleComponent },
    ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardModuleRoutingModule { }
