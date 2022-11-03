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


export interface VehicleCreate {
  licensePlates: string,
  rfidcode: string,
  nameDriver: string,
  phoneNumber: string,
  customer: string,
  tonnageDefault: string,
  idCardNumber: string,
  mediumUnladenWeight: string,
}



export interface VehicleEdit {
  id: number,
  licensePlates: string,
  rfidcode: string,
  nameDriver: string,
  phoneNumber: string,
  customer: string,
  tonnageDefault: string,
  idCardNumber: string,
  mediumUnladenWeight: string,
}``

