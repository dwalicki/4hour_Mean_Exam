// Dependencies

import { IServerMessage } from '../interfaces/server-message';

export class ServerMessage<T> implements IServerMessage<T> {
    success: boolean;
    output: T;
    
    /**
     * 
     * @param success boolean representing if data was accepted 
     * @param output feedback from the database
     */

    constructor(success: boolean, output: T){
        this.success = success;
        this.output = output;
    }
}