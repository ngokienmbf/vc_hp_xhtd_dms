    export interface AccountGroup
{
    id: number,
    name: string,
    state: boolean,
    createDay: Date,
    updateDay: Date,
    createBy: string,
    updateBy: string,
}

export interface lstAccountGroup
{
    currentPage: number,
    pageSize : number,
    totalRecord : number,
    totalPage: number
    data : AccountGroup[]
}



