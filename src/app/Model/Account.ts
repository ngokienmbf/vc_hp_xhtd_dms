export interface Account
{
    id: number,
    username: string,
    fullName: string,
    email: string,
    phoneNumber : string,
    password : string,

}

export interface lstAccount
{
    currentPage: number,
    pageSize : number,
    totalRecord : number,
    totalPage: number
    data : Account[]
}


export interface AccountCreate
{

    username: string,
    fullName: string,
    email: string,
    phoneNumber : string,
    password : string,
}



export interface AccountEdit
{
    id: number,
    username: string,
    fullName: string,
    email: string,
    phoneNumber : string,
    password : string,
}

export interface Permission
{
    parent : PermissionDetail
    child : PermissionDetail[]
}


export interface PermissionDetail
{
    title : string,
    claimValue: string,
    isHas : boolean
}
