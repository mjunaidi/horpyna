import ChannelManager from "./channelManager";
import IResponseCallback from "./iResponseCallback";
import Channel from "./channel";
import InputChannel from "./inputChannel";
import CallbackChannel from "./callbackChannel";
import OutputChannel from "./outputChannel";
import IInputSetValueCallback from "./iInputSetValueCallback";
import ICallbackSetValueCallback from "./iCallbackSetValueCallback";
import Response from "./response";
import Request from "./request";
import * as CHANNEL from "../constants/channels";
import * as ERROR from "../constants/errors";

class Component {
  private _inputChannelManager: ChannelManager;
  private _outputChannelManager: ChannelManager;

  constructor(options:any) {
    this._inputChannelManager = new ChannelManager();
    this._outputChannelManager = new ChannelManager();
    this.createInputChannel(CHANNEL.DEFAULT_CHANNEL);
    this.createOutputChannel(CHANNEL.DEFAULT_CHANNEL);
    this.onInit(options);
  }

  public onInit(options:any) {}

  public onNext(request: Request, response: Response) {
    response.send(request.getValue());
  }

  public start(value:any, targetChannelName: string = CHANNEL.DEFAULT_CHANNEL): Component {
    return this.next(new Request(value, null, this.getInputChannel(targetChannelName)));
  }

  public next(request: Request): Component {
    let response: Response = new Response(this._getResponseCallback());
    setTimeout(() => this.onNext(request, response), 0);
    return this;
  }

  public addJoint(target: Component, currentChannelName: string = CHANNEL.DEFAULT_CHANNEL, targetChannelName: string = CHANNEL.DEFAULT_CHANNEL): Component {
    let targetInput: Channel = target.getInputChannel(targetChannelName);
    let currentOutput: Channel = this.getOutputChannel(currentChannelName);
    targetInput.addChannel(currentOutput);
    currentOutput.addChannel(targetInput);
    return this;
  }

  public addCallback(target: ICallbackSetValueCallback, currentChannelName: string = CHANNEL.DEFAULT_CHANNEL) {
    let currentOutput: Channel = this.getOutputChannel(currentChannelName);
    currentOutput.addChannel(new CallbackChannel(target));
    return this;
  }

  private _getResponseCallback(): IResponseCallback {
    return (value: any, channelName: string) => {
      this.getOutputChannel(channelName).emitValue(value);
    };
  }

  public isInputChannel(channelName: string = CHANNEL.DEFAULT_CHANNEL): boolean {
    return this._inputChannelManager.isChannel(channelName);
  }

  public isOutputChannel(channelName: string = CHANNEL.DEFAULT_CHANNEL): boolean {
    return this._outputChannelManager.isChannel(channelName);
  }

  public getInputChannel(channelName: string = CHANNEL.DEFAULT_CHANNEL): InputChannel {
    if(this.isInputChannel(channelName) === false) {
      throw Error(ERROR.NON_EXIST_CHANNEL);
    }
    return <InputChannel> this._inputChannelManager.getChannel(channelName);
  }

  public getOutputChannel(channelName: string = CHANNEL.DEFAULT_CHANNEL): OutputChannel {
    if(this.isOutputChannel(channelName) === false) {
      throw Error(ERROR.NON_EXIST_CHANNEL);
    }
    return <OutputChannel> this._outputChannelManager.getChannel(channelName);
  }

  public _getInputChannelSetValueCallback(): IInputSetValueCallback {
    return (value: any, sourceOutput: OutputChannel, currentInput: InputChannel) => {
      this.next(new Request(value, sourceOutput, currentInput));
    };
  }

  public createInputChannel(channelName: string): Component {
    if(this.isInputChannel(channelName) === true) {
      throw Error(ERROR.UNIQUE_NAME_INPUT_CHANNEL);
    }
    this._inputChannelManager.addChannel(new InputChannel(channelName, this._getInputChannelSetValueCallback()));
    return this;
  }

  public createOutputChannel(channelName: string): Component {
    if(this.isOutputChannel(channelName) === true) {
      throw Error(ERROR.UNIQUE_NAME_OUTPUT_CHANNEL);
    }
    this._outputChannelManager.addChannel(new OutputChannel(channelName));
    return this;
  }

}

export default Component;
