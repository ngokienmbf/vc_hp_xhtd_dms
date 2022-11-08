export interface OrderOperating {
  id: number // khóa chính
  vehicle: string // Biến số xe
  driverName: string // tên lái xe
  nameDistributor: string // tên nhà phân phối
  itemId: number // Mã hàng hóa
  nameProduct: string // tên hàng hóa
  catId: string // nhóm hàng hóa
  sumNumber: number // số lượng đặt hàng
  timeIn33: Date // Không dùng
  cardNo: string // số thẻ rfid
  orderId: number // số đơn hàng
  deliveryCode: string // mã số giao hàng
  deliveryCodeParent: string // mã số gian hàng ghép xe
  orderDate: Date // ngày đặt hàng
  typeProduct: string // loại hàng hóa
  timeIn21: Date
  timeIn22: Date
  confirm1: number // trạng thái xác nhận khi lấy số
  timeConfirm1: Date // thời gian xác nhận khi lấy số
  confirm2: number // trạng thái xác nhận khi vào cổng
  timeConfirm2: Date // thời gian xác nhận khi vào cổng
  confirm3: number // Trạng thái xác nhận khi cân vào
  timeConfirm3: Date // Thời gian xác nhận khi cân vào
  confirm4: number // Trạng thái xác nhận khi lấy hàng
  timeConfirm4: Date // Thời gian xác nhận khi lấy hàng
  confirm5: number // Trạng thái xác nhận khi lấy hàng xong
  timeConfirm5: Date // Thời gian xác nhận khi lấy lấy hàng xong
  confirm6: number // Trạng thái xác nhận khi lấy hàng xong
  timeConfirm6: Date // Thời gian xác nhận khi lấy hàng xong
  confirm7: number // Trạng thái xác nhận khi cân ra
  timeConfirm7: Date // Thời gian xác nhận khi cân ra
  confirm8: number // Trạng thái xác nhận khi lấy ra cổng
  timeConfirm8: Date // Thời gian xác nhận khi ra cổng
  confirm9: number // Trạng thái xác nhận khi giao hàng
  timeConfirm9: Date // Thời gian xác nhận khi giao hàng
  confirm9Note: string // Ghi chú khi giao hàng
  confirm9Image: string // Đường dẫn hình ảnh khi giao hàng
  step: number // Số thứ tự bước của đơn hàng
  indexOrder: number // Số thứ tự lấy hàng (Số lốt)
  indexOrder1: number // Số thứ tự lấy hàng (Số lốt)
  indexOrder2: number // Số thứ tự lấy hàng (Số lốt)
  trough: number // Số hiệu máng xuất
  trough1: number // Số hiệu máng xuất
  numberVoice: number // Số lần đã gọi vào lấy hàng
  state: string // Trạng thài đơn hàng (websales)
  prioritize: number // Thứ tự ưu tiên
  dayCreate: Date // Ngày tạo đơn hàng
  iDDistributorSyn: number // Mã nhà phân phối
  areaId: number // Mã địa bàn
  areaName: string // Tên địa bàn
  codeStore: string
  nameStore: string
  driverUserName: string // Tài khoản lái xe
  driverAccept: Date // Ngày, giờ lái xe nhận đơn hàng
  indexOrderTemp: number // Xếp số tạm
  weightIn: number // Khối lượng cân vào (kg)
  weightInTime: Date // Thời gian cân vào
  weightOut: number // Khối lượng cân ra (kg)
  weightOutTime: Date // Thời gian cân ra
  noteFinish: string // Ghi chú khi kết thúc đơn hàng
  longitude: string // Kinh độ (Lấy khi kết thúc đơn hàng)
  latitude: string // Vĩ độ (Lấy khi kết thúc đơn hàng)
  countReindex: number // Số lần đã quay vòng lốt
  isVoiced: boolean // Đơn hàng đã hủy
  locationCode: string // Mã vùng
  lockInDbet: boolean // Khóa do công nợ
  logJobAttach: string // Thông tin ghi log
  isSyncedByNewWS: boolean // Thông tin đồng bộ từ websales
  troughLineCode: string // Dây chuyền xuất hàng
  isScaleAuto: boolean // Trạng thái cân tự động
  timeConfirmHistory: Date // Lịch sử xác nhận
  logHistory: string // Thông tin lịch sử đơn hàng
  moocCode: string // Số mooc
  logProcessOrder: string // Thông tin lịch sử xử lý đơn hàng
  driverPrintNumber: number // Số lần in phiếu
  driverPrintTime: Date // Thời gian in phiếu gần nhất
  warningNotCall: boolean // Cảnh báo không gọi
  xiRoiAttatchmentFile: string // Đường dẫn file KCS
  packageNumber: string // Số gói
  shifts: number // Số hiệu ca trực
  autoScaleOut: boolean // Thông tin tự động cân ra
  createDay: Date
  createBy: string
  updateDay: Date
  updateBy: string
}
export interface lstOrderOperating {
  currentPage: number,
  pageSize: number,
  totalRecord: number,
  totalPage: number
  data: OrderOperating[]
}



