export interface rfidSign {
  Id: number,
  Vehicle: string,
  RfidCode: string,
  Image: string,
  CreateDay: Date,
  CreateBy: string,
  UpdateDay: Date,
  UpdateBy: string,
}
export interface lstRfidSign {
  currentPage: number,
  pageSize: number,
  totalRecord: number,
  totalPage: number
  data: rfidSign[]
}
