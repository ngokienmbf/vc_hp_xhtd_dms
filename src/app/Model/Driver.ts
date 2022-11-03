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
  state: boolean,
  createDay: Date,
  createBy: string,
  updateDay: Date,
  updateBy: string,
}

export interface lstDriver {
  currentPage: number,
  pageSize: number,
  totalRecord: number,
  totalPage: number
  data: Driver[]
}
