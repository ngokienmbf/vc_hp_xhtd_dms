export interface Device {
  id: number,
  code: string,
  name: string,
  codeParent: string,
  port: string,
  ipaddress: string,
  inputPort: number,
  outputAddrType: number,
  outputPort: number,
  operID: number,
  doorAction: number,
  doorOrAuxoutID: number,

  createDay: Date,
  updateDay: Date,
  createBy: string,
  updateBy: string,
}

export interface lstDevice {
  currentPage: number,
  pageSize: number,
  totalRecord: number,
  totalPage: number
  data: Device[]
}


