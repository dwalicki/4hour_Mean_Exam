export interface IServerMessage<T> {
    success: boolean;

    output: T;
}