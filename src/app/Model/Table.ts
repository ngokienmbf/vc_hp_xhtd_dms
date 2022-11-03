export interface Column
{
   name : string,
}

export interface Pagination
{
   currentPage: number,
   pageSize : number,
   totalRecord : number,
   totalPage : number,
}

export interface OkObjectResult
{
   succeeded: boolean,
   message : number,
   data : any,
}