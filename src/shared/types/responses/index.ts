export type ResponseWithData<T> = {
    data: T;
    success: boolean;
    errors: Array<number>;
};

export type BaseResponse = {
    success: boolean;
    errors: Array<number>;
}
