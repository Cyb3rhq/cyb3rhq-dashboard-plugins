import { ICyb3rhqError, ICyb3rhqErrorInfo, ICyb3rhqErrorLogOpts } from "../../types";


export default abstract class Cyb3rhqError extends Error {
    abstract logOptions: ICyb3rhqErrorLogOpts;
    constructor(public error: Error, info?: ICyb3rhqErrorInfo) {
        super(info?.message || error.message);
        const childrenName = this.constructor.name; // keep the children class name
        Object.setPrototypeOf(this, Cyb3rhqError.prototype); // Because we are extending built in class
        this.name = childrenName;
        this.stack = this.error.stack; // keep the stack trace from children
    }
}