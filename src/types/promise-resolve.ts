type PromiseResolveDataBase<T> = {
    code: number,
    message?:string,
    data?: T
}

type PromiseResolveDataSuccess<T> = {
    code: 200,
    data: T
}

type PromiseResolveDataError = {
    code: 400|401|403|404,
    message: string
}

export type PromiseResolveData<T = any> = PromiseResolveDataBase<T> & (PromiseResolveDataSuccess<T> | PromiseResolveDataError)
