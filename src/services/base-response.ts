export interface BaseResponse<T> {
    status: number;
    message: string;
    data: T;
}

export enum HttpMethod {
    GET = "GET",
    POST = "POST",
}

export interface Pagination<T> {
    limit: number;
    total_record: number;
    list: T;
}

export function isSuccess<T>(response: BaseResponse<T>): boolean {
    return response.status === 200;
}
export function isBadRequest<T>(response: BaseResponse<T>): boolean {
    return response.status === 400;
}
