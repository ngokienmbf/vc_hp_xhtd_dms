import { Device } from "./Device"

export interface Category {
  id: number,
  code: string,
  name: string,

  //descriptioon: string,
  state: boolean, 
  showIndex: number,
  createDay: Date,
  updateDay: Date,
  createBy: string,
  updateBy: string,
  devices: Device[],
  _countActiveDevices: number,
  _countDeactiveDevices: number,
}

export interface lstCategory {
  currentPage: number,
  pageSize: number,
  totalRecord: number,
  totalPage: number
  data: Category[]
}


