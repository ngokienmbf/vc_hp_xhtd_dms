export interface TypeRoute {
    name : string
    url?: string
    roles?: any
    children?: TypeRoute[]
}



export const ROUTE_DATA: TypeRoute[] = [
    {
        name :'Quản lý danh mục',
        roles: ["Admin"],
        children : [
            {
                name :'Đơn vị',
                url:'don-vi',
                roles: ["Admin"],

            },
            {
                name :'Phương tiện',
                url:'phuong-tien',
                roles: ["Admin"],

            },
        ]
    },
    {
      name :'Nghiệp vụ',
      roles: ["Admin", "ds"],
      children : [
          {
              name :'Nhập cont từ tàu',
              url: 'nhapcont',
              roles: ["Admin"],
          },
          {
              name :'Lấy nguyên/rút ruột-Trả rỗng',
              url:'import-container',
              roles: ["Admin", "ds"],
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
                name :'Thống kê truy cập',
                url:'404-not-found',
                roles: ["Admin"],
            },
            {
                name :'Phân quyền hệ thống',
                url:'quan-ly-he-thong',
                roles: ["Admin"],
            },
            {
                name :'Setting',
                url:'setting',
                roles: ["Admin"],
            },
        ]
    },    
]
