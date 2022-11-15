export interface TypeRoute {
  name: string
  url?: string
  roles?: any
  children?: TypeRoute[]
}

// Quản lý
// Quản lý lái xe
// Quản lý phương tiện
// Quản lý vào, ra
// Quản lý điều hành đơn hàng
// Quản lý xuất hàng trạm cân 951
// Quản lý xuất hàng máng xuất xi bao
// Quản lý xuất hàng máng xuất xi rời
// Quản lý xuất hàng Clinker
// Quản lý giám sát hành trình đơn hàng
// Danh mục (Master Data)
// Danh mục máng xuất
// Danh mục thẻ RFID
// Danh mục thiết bị
// Danh mục khác
// Quản trị hệ thống
// Quản lý tài khoản người dùng
// Quản lý nhóm tài khoản, phân quyền
// Quản lý cấu hình thiết bị
// Quản lý cấu hình chung hệ thống
// Đăng nhập
export const ROUTE_DATA: TypeRoute[] = [
  {
    name: 'Ví dụ',
    roles: ["xxx"],
    url: 'example',
  },
  {
    name: 'Quản lý',
    roles: ["Admin"],
    children: [
      {
        name: 'Lái xe',
        url: 'lai-xe',
      },
      {
        name: 'Phương tiện',
        url: 'phuong-tien',
        roles: ["Admin", "ds"],
      },
      {
        name: 'Lái xe - Phương tiện',
        url: 'lai-xe-phuong-tien',
        roles: ["Admin", "ds"],
      },
      {
        name: 'Quản lý điều hành đơn',
        url: 'dieu-hanh-don',
        roles: ["Admin", "ds"]
      },
      {
        name: 'Quản lý vào ra',
        url: 'quan-ly-vao-ra',
        roles: ["Admin", "ds"]
      },
      {
        name: 'Quản lý trạm cân 951',
        url: 'quan-ly-tram-can',
        roles: ["Admin", "ds"]
      },
    ]
  },
  {
    name: 'Danh mục',
    roles: ["ds"],
    children: [
      {
        name: 'Danh mục máng xuất',
        url: 'mang-xuat',
        roles: ["Admin", "ds"]
      },
      {
        name: 'Danh mục RFID',
        url: 'rfid',
        roles: ["Admin", "ds"]
      },
        {
            name: 'Đơn hàng',
            url: 'don-hang',
            roles: ["Admin", "ds"]
        },
        {
            name :'Danh mục thiết bị',
            url:'ds-thiet-bi',
            roles: ["Admin"],
        },
        {
            name :'Danh mục khác',
            url:'404-not-found',
            roles: ["Admin"],
        },
    ]
    },
    {
        name :'Quản trị hệ thống',
        roles: ["Admin"],
        children : [
            {
                name :'Quản lý tài khoản',
                url:'quan-ly-tai-khoan',
                roles: ["Admin"],
            },
            {
                name :'Phân quyền hệ thống',
                url:'quan-ly-he-thong',
                roles: ["Admin"],
            },
            {
                name :'Cấu hình thiết bị',
                url:'thiet-bi',
                roles: ["Admin"],
            },
            {
                name :'Cấu hình chung hệ thống',
                url:'setting',
                roles: ["Admin"],
            },
        ]
    },
]
