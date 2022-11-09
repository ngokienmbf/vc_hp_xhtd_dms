export interface trough {
  id: number,
  code: string,
  name: string,
  height: number,
  width: number,
  long: number,
  working: boolean,
  problem: boolean,
  state: boolean,
  deliveryCodeCurrent: string,
  planQuantityCurrent: number,
  countQuantityCurrent: number,
  isPicking: boolean,
  transportNameCurrent: string,
  checkInTimeCurrent: Date,
  isInviting: boolean,
  lineCode: string,
  createDay: Date,
  createBy: string,
  updateDay: Date,
  updateBy: string,
}

export interface lstTrough {
  currentPage: number,
  pageSize: number,
  totalRecord: number,
  totalPage: number
  data: trough[]
}
