export interface Vehicle {
  idVehicle: number,
  vehicle: string,
  tonnage: number,
  tonnageDefault: number,
  nameDriver: string,
  idCardNumber: string,
  heightVehicle: number,
  widthVehicle: number,
  longVehicle: number,
  unladenWeight1: number,
  unladenWeight2: number,
  unladenWeight3: number,
  isSetMediumUnladenWeight: number,
  drivers: string,
  createDay: Date,
  createBy: string,
  updateDay: Date,
  updateBy: string,
}

export interface lstVehicle {
  currentPage: number,
  pageSize: number,
  totalRecord: number,
  totalPage: number
  data: Vehicle[]
}


