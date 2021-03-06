import sinon from "sinon";
import chai from "chai";
import chaiThings from "chai-things";
import Horpyna from "../../dist/index";

chai.use(chaiThings);
const expect = chai.expect;

describe("Component", () => {
  const dummyValue = "BBBB";
  describe("constructor", () => {

    it("should trigger onInit method", done => {
      const onInitSpy = sinon.spy(Horpyna.Component.prototype, "onInit");
      new Horpyna.Component();
      expect(onInitSpy.calledOnce).to.be.true;
      onInitSpy.restore();
      done();
    });

    it("should trigger onInit method and pass options object from constructor params", done => {
      const onInitSpy = sinon.spy(Horpyna.Component.prototype, "onInit");
      const options = {};
      new Horpyna.Component(null, options);
      expect(onInitSpy.calledOnce).to.be.true;
      expect(onInitSpy.args[0][0]).to.be.equal(options);
      onInitSpy.restore();
      done();
    });
  });

  describe("getName", () => {
    it("should return name", done => {
      const name = "someName";
      const component = new Horpyna.Component(name);
      expect(component.getName()).to.be.equal(name);
      done();
    });
  });

  describe("setState & getState method & clearState", () => {
    it("should save and load data and then clear it", done => {
      const component = new Horpyna.Component();
      component.setState(dummyValue);
      expect(component.getState()).to.be.equal(dummyValue);
      component.clearState();
      expect(component.getState()).to.be.null;
      done();
    });
  });

  describe("use Structure object in Component", done => {
    const innerComponentName = "innerComponent";
    const callbackName = "innerCallback";
    const customComponent = new class extends Horpyna.Component {
      onNext(request, response, structure) {
        const innerComponent = structure.createComponent(innerComponentName, Horpyna.Component);
        structure.createCallback(callbackName, innerComponent.getOutputChannel(), (value, source) => {
          response.send(request.getValue());
        });
      }
    };
    customComponent.setInput(dummyValue);
    new Horpyna.Joint(null, customComponent.getOutputChannel(), new Horpyna.CallbackChannel((value, source) => {
      expect(value).to.be.equal(dummyValue);
      expect(source).to.be.equal(customComponent.getOutputChannel());
      done();
    }));
  });

  // TODO: tests for callbacks

  describe("setInput method", () => {

    it("should trigger next method with request args when default channel name", done => {
      const nextSpy = sinon.spy(Horpyna.Component.prototype, "next");
      const component = new Horpyna.Component();
      component.setInput(dummyValue);
      expect(nextSpy.calledOnce).to.be.true;
      const request = nextSpy.args[0][0];
      expect(request).to.be.an.instanceof(Horpyna.Request);
      expect(request.getValue()).to.be.equal(dummyValue);
      const targetChannel = request.getTarget();
      expect(targetChannel).to.be.an.instanceof(Horpyna.InputChannel);
      expect(targetChannel.getName()).to.be.equal(Horpyna.CHANNEL.DEFAULT_CHANNEL);
      nextSpy.restore();
      done();
    });

  });
  describe("createInputChannel & getInputChannel method", () => {
    const channelName = "AAAA";
    it("should create new channel and return it back", done => {
      const component = new Horpyna.Component();
      component.createInputChannel(channelName);
      const channel = component.getInputChannel(channelName);
      expect(channel).to.be.an.instanceof(Horpyna.InputChannel);
      expect(channel.getName()).to.be.equal(channelName);
      done();
    });

    it("should create default channel in constructor and get it by name", done => {
      const component = new Horpyna.Component();
      const channel = component.getInputChannel(Horpyna.CHANNEL.DEFAULT_CHANNEL);
      expect(channel).to.be.an.instanceof(Horpyna.InputChannel);
      expect(channel.getName()).to.be.equal(Horpyna.CHANNEL.DEFAULT_CHANNEL);
      done();
    });

    it("should create default channel in constructor and get it by default value", done => {
      const component = new Horpyna.Component();
      const channel = component.getInputChannel();
      expect(channel).to.be.an.instanceof(Horpyna.InputChannel);
      expect(channel.getName()).to.be.equal(Horpyna.CHANNEL.DEFAULT_CHANNEL);
      done();
    });

    it("should throw error when trying create channel with existing name", done => {
      const component = new Horpyna.Component();
      component.createInputChannel(channelName);
      expect(component.createInputChannel.bind(component, channelName)).to.throw(Error, Error.UNIQUE_NAME_INPUT_CHANNEL);
      done();
    });

    it("should throw error when trying get non-existent channel", done => {
      const component = new Horpyna.Component();
      expect(component.getInputChannel.bind(component, channelName)).to.throw(Error, Error.NON_EXIST_CHANNEL);
      done();
    });
  });

  describe("createOutputChannel & getOutputChannel method", () => {
    const channelName = "AAAA";
    it("should create new channel and return it back", done => {
      const component = new Horpyna.Component();
      component.createOutputChannel(channelName);
      const channel = component.getOutputChannel(channelName);
      expect(channel).to.be.an.instanceof(Horpyna.OutputChannel);
      expect(channel.getName()).to.be.equal(channelName);
      done();
    });

    it("should create default channel in constructor", done => {
      const component = new Horpyna.Component();
      const channel = component.getOutputChannel();
      expect(channel).to.be.an.instanceof(Horpyna.OutputChannel);
      expect(channel.getName()).to.be.equal(Horpyna.CHANNEL.DEFAULT_CHANNEL);
      done();
    });

    it("should throw error when trying create channel with existing name", done => {
      const component = new Horpyna.Component();
      component.createOutputChannel(channelName);
      expect(component.createOutputChannel.bind(component, channelName)).to.throw(Error, Error.UNIQUE_NAME_INPUT_CHANNEL);
      done();
    });

    it("should throw error when trying get non-existent channel", done => {
      const component = new Horpyna.Component();
      expect(component.getOutputChannel.bind(component, channelName)).to.throw(Error, Error.NON_EXIST_CHANNEL);
      done();
    });
  });

  describe("next method", () => {
    it("should trigger onNext method with request and response objects", done => {

      const nextStub = sinon.stub(Horpyna.Component.prototype, "onNext", (request, response) => {
        expect(request).to.be.an.instanceof(Horpyna.Request);
        expect(request.getValue()).to.be.equal(dummyValue);
        expect(response).to.be.an.instanceof(Horpyna.Response);
        nextStub.restore();
        done();
      });
      const component = new Horpyna.Component();
      component.next(new Horpyna.Request(dummyValue, null, component.getInputChannel(Horpyna.CHANNEL.DEFAULT_CHANNEL)));
    });

    it("should trigger response send with channel Error if onNext has error", done => {
      const errorMessage = "Some Error";
      const nextStub = sinon.stub(Horpyna.Component.prototype, "onNext", (request, response) => {
        nextStub.restore();
        throw Error(errorMessage);
      });
      const sendStub = sinon.stub(Horpyna.Response.prototype, "send", (value, channelName) => {
        expect(value).to.be.an.instanceof(Error);
        expect(value.message).to.be.equal(errorMessage);
        expect(channelName).to.be.equal(Horpyna.CHANNEL.ERROR_CHANNEL);
        sendStub.restore();
        done();
      });
      const component = new Horpyna.Component();
      component.next(new Horpyna.Request(dummyValue, null, component.getInputChannel(Horpyna.CHANNEL.DEFAULT_CHANNEL)));
    });
  });

});
