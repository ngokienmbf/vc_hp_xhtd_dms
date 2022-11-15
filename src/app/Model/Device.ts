export interface Device {
  id: number,
  code: string,
  name: string,
  manCode: string,
  catCode: string,
  ipAddress: string,
  portNumber: number,

  portNumberDeviceIn: number,
  portNumberDeviceOut: number,
  portNumberDeviceIn1: number,
  portNumberDeviceOut1: number,
  portNumberDeviceIn2: number,
  portNumberDeviceOut2: number,

  descriptioon: string,
  state: boolean, 
  showIndex: number,
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


