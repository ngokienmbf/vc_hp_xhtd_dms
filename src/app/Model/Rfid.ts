export interface rfid {
  id: number,
  code: string,
  vehicle: string,
  dayReleased: Date,
  dayExpired: Date,
  note: string,
  state: boolean,
  createDay: Date,
  createBy: string,
  updateDay: Date,
  updateBy: string,
  lastEnter: Date,
}
export interface lstRfid {
  currentPage: number,
  pageSize: number,
  totalRecord: number,
  totalPage: number
  data: rfid[]
}
