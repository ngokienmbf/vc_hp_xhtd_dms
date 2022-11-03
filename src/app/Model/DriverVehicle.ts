export interface DriverVehicle {
  id: number,
  vehicle: string,
  userName: string,
  createDay: Date,
  createBy: string,
  updateDay: Date,
  updateBy: string,
}

export interface lstDriverVehicle {
  currentPage: number,
  pageSize: number,
  totalRecord: number,
  totalPage: number
  data: DriverVehicle[]
}
