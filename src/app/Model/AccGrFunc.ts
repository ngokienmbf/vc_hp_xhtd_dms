    export interface AccGrFunc
{
    id: number,
    groupId: number,
    functionId: number,
    f_Add: boolean,
    f_Edit: boolean,
    f_Del: boolean,
    f_View: boolean,
    f_Print: boolean,
    f_Other: boolean,
    createDay: Date,
    updateDay: Date,
    createBy: string,
    updateBy: string,
}

export interface lstAccGrFunc
{
    currentPage: number,
    pageSize : number,
    totalRecord : number,
    totalPage: number
    data : AccGrFunc[]
}



