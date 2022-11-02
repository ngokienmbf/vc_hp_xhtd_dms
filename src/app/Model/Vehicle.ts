export interface Vehicle {
  idVehicle: number,
  vehicle: string,
  nameDriver: string,
  idCardNumber: string,

  tonnage: number,
  tonnageDefault: number,
  heightVehicle:	number,
  widthVehicle:	number,
  longVehicle:	number,

  unladenWeight1:	number,
  unladenWeight2:	number,
  unladenWeight3:	number,
  isSetMediumUnladenWeight:	boolean,

  createDay: Date,
  updateDay: Date,
  createBy: string,
  updateBy: string,
}

export interface lstVehicle {
  currentPage: number,
  pageSize: number,
  totalRecord: number,
  totalPage: number
  data: Vehicle[]
}


