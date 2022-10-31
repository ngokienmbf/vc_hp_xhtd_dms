export interface Driver {
  id: number,
  fullName: string,
  email: string,
  phone: string,
  birthday: Date,
  gender: string,
  idCard: string,
  address: string,
  userName: string,
  state: number,
  createDay: Date,
  createBy: Date,
  cpdateDay: Date,
  cpdateBy: Date,
}

export interface lstDriver {
  currentPage: number,
  pageSize: number,
  totalRecord: number,
  totalPage: number
  data: Driver[]
}


export interface DriverCreate {
  fullName: string,
  email: string,
  phone: string,
  birthday: Date,
  gender: string,
  idCard: string,
  address: string,
  userName: string,
  state: number,
}



export interface DriverEdit {
  id: number,
  fullName: string,
  email: string,
  phone: string,
  birthday: Date,
  gender: string,
  idCard: string,
  address: string,
  userName: string,
  state: number,
}

