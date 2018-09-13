// base interface for the server message object //

export interface IServerMessage {
    success: boolean;
    output: any;
}

// class implementation of the base server message object //

export class ServerMessage implements IServerMessage {
    success: boolean;
    output: any;

/**
    * base constructor
    * @param success boolean representing if data was accepted
    * @param output feedback from the database
*/
    constructor(success: boolean, output: any) {
        this.success = success;
        this.output = output;
    }
}