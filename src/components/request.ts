import OutputChannel from "./outputChannel";
import InputChannel from "./inputChannel";

class Request {
  private _value: any;
  private _source: OutputChannel;
  private _target: InputChannel;

  constructor(value:any, source: OutputChannel, target: InputChannel) {
    this._value = value;
    this._source = source;
    this._target = target;
  }

  public getValue(): any {
    return this._value;
  }

  public getTarget(): InputChannel {
    return this._target;
  }

  public getSource(): OutputChannel {
    return this._source;
  }
}

export default Request;
