export interface SystemParameter {
  id: number,
  code: string,
  name: string,
  value: string,
  createDay: Date,
  createBy: string,
  updateDay: Date,
  updateBy: string,
}
export interface lstSystemParameter{
  currentPage: number,
  pageSize: number,
  totalRecord: number,
  totalPage: number
  data: SystemParameter[]
}
