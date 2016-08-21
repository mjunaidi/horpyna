require("source-map-support").install(),module.exports=function(e){function t(r){if(n[r])return n[r].exports;var u=n[r]={exports:{},id:r,loaded:!1};return e[r].call(u.exports,u,u.exports,t),u.loaded=!0,u.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){e.exports=n(1)},function(e,t,n){"use strict";function r(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t["default"]=e,t}function u(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n(2),o=u(a),i=n(5),l=u(i),f=n(4),c=u(f),s=n(8),h=u(s),p=n(3),d=u(p),_=n(10),y=u(_),v=n(9),b=u(v),C=n(7),N=r(C);t["default"]={Component:o["default"],Channel:l["default"],InputChannel:c["default"],OutputChannel:h["default"],ChannelManager:d["default"],Request:y["default"],Response:b["default"],CHANNEL:N}},function(e,t,n){"use strict";function r(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t["default"]=e,t}function u(e){return e&&e.__esModule?e:{"default":e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),i=n(3),l=u(i),f=n(4),c=u(f),s=n(6),h=u(s),p=n(8),d=u(p),_=n(9),y=u(_),v=n(10),b=u(v),C=n(7),N=r(C),E=n(11),O=r(E),g=function(){function e(t){a(this,e),this._inputChannelManager=new l["default"],this._outputChannelManager=new l["default"],this.createInputChannel(N.DEFAULT_CHANNEL),this.createOutputChannel(N.DEFAULT_CHANNEL),this.onInit(t)}return o(e,[{key:"onInit",value:function(e){}},{key:"onNext",value:function(e,t){t.send(e.getValue())}},{key:"start",value:function(e){var t=arguments.length<=1||void 0===arguments[1]?N.DEFAULT_CHANNEL:arguments[1];return this.next(new b["default"](e,null,this.getInputChannel(t)))}},{key:"next",value:function(e){var t=this,n=new y["default"](this._getResponseCallback());return setTimeout(function(){return t.onNext(e,n)},0),this}},{key:"addJoint",value:function(e){var t=arguments.length<=1||void 0===arguments[1]?N.DEFAULT_CHANNEL:arguments[1],n=arguments.length<=2||void 0===arguments[2]?N.DEFAULT_CHANNEL:arguments[2],r=e.getInputChannel(n),u=this.getOutputChannel(t);if(r.isChannel(u)!==!1||u.isChannel(r)!==!1)throw Error(O.ONE_JOINT_PER_CHANNEL_PAIR);return r.addChannel(u),u.addChannel(r),this}},{key:"addCallback",value:function(e){var t=arguments.length<=1||void 0===arguments[1]?N.DEFAULT_CHANNEL:arguments[1],n=this.getOutputChannel(t);return n.addChannel(new h["default"](e)),this}},{key:"_getResponseCallback",value:function(){var e=this;return function(t,n){e.getOutputChannel(n).emitValue(t)}}},{key:"isInputChannel",value:function(){var e=arguments.length<=0||void 0===arguments[0]?N.DEFAULT_CHANNEL:arguments[0];return this._inputChannelManager.isChannelByName(e)}},{key:"isOutputChannel",value:function(){var e=arguments.length<=0||void 0===arguments[0]?N.DEFAULT_CHANNEL:arguments[0];return this._outputChannelManager.isChannelByName(e)}},{key:"getInputChannel",value:function(){var e=arguments.length<=0||void 0===arguments[0]?N.DEFAULT_CHANNEL:arguments[0];if(this.isInputChannel(e)===!1)throw Error(O.NON_EXIST_CHANNEL);return this._inputChannelManager.getChannel(e)}},{key:"getOutputChannel",value:function(){var e=arguments.length<=0||void 0===arguments[0]?N.DEFAULT_CHANNEL:arguments[0];if(this.isOutputChannel(e)===!1)throw Error(O.NON_EXIST_CHANNEL);return this._outputChannelManager.getChannel(e)}},{key:"_getInputChannelSetValueCallback",value:function(){var e=this;return function(t,n,r){e.next(new b["default"](t,n,r))}}},{key:"createInputChannel",value:function(e){if(this.isInputChannel(e)===!0)throw Error(O.UNIQUE_NAME_INPUT_CHANNEL);return this._inputChannelManager.addChannel(new c["default"](e,this._getInputChannelSetValueCallback())),this}},{key:"createOutputChannel",value:function(e){if(this.isOutputChannel(e)===!0)throw Error(O.UNIQUE_NAME_OUTPUT_CHANNEL);return this._outputChannelManager.addChannel(new d["default"](e)),this}}]),e}();t["default"]=g},function(e,t){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),u=function(){function e(){var t=arguments.length<=0||void 0===arguments[0]?[]:arguments[0];n(this,e),this._channels=t}return r(e,[{key:"isChannelByName",value:function(e){return"undefined"!=typeof this.getChannel(e)}},{key:"isChannel",value:function(e){return this.getChannels().some(function(t){return t===e})}},{key:"addChannel",value:function(e){this._channels.push(e)}},{key:"getChannel",value:function(e){return this._channels.find(function(t){return t.getName()===e})}},{key:"getChannels",value:function(){return this._channels}}]),e}();t["default"]=u},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function u(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),l=n(5),f=r(l),c=function(e){function t(e,n){u(this,t);var r=a(this,Object.getPrototypeOf(t).call(this,e));return n&&r.setCallback(n),r}return o(t,e),i(t,[{key:"setCallback",value:function(e){return this._onSetValueCallback=e,this}},{key:"setValue",value:function(e,t){this._onSetValueCallback(e,t,this)}}]),t}(f["default"]);t["default"]=c},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function u(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),l=n(3),f=r(l),c=function(e){function t(e){u(this,t);var n=a(this,Object.getPrototypeOf(t).call(this));return n._name=e,n}return o(t,e),i(t,[{key:"getName",value:function(){return this._name}}]),t}(f["default"]);t["default"]=c},function(e,t,n){"use strict";function r(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t["default"]=e,t}function u(e){return e&&e.__esModule?e:{"default":e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var l=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),f=n(4),c=u(f),s=n(7),h=r(s),p=function(e){function t(e){a(this,t);var n=o(this,Object.getPrototypeOf(t).call(this,h.DEFAULT_CHANNEL));return n.setCallback(e),n}return i(t,e),l(t,[{key:"setCallback",value:function(e){return this._callback=e,this}},{key:"setValue",value:function(e,t){this._callback(e,t)}}]),t}(c["default"]);t["default"]=p},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.DEFAULT_CHANNEL="default"},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function u(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),l=n(5),f=r(l),c=function(e){function t(e){return u(this,t),a(this,Object.getPrototypeOf(t).call(this,e))}return o(t,e),i(t,[{key:"emitValue",value:function(e){var t=this,n=this.getChannels();n.forEach(function(n){n.setValue(e,t)})}}]),t}(f["default"]);t["default"]=c},function(e,t,n){"use strict";function r(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t["default"]=e,t}function u(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),o=n(7),i=r(o),l=function(){function e(t){u(this,e),this._onSendCallback=t}return a(e,[{key:"send",value:function(){var e=arguments.length<=0||void 0===arguments[0]?void 0:arguments[0],t=arguments.length<=1||void 0===arguments[1]?i.DEFAULT_CHANNEL:arguments[1];return this._onSendCallback(e,t),this}}]),e}();t["default"]=l},function(e,t){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),u=function(){function e(t,r,u){n(this,e),this._value=t,this._source=r,this._target=u}return r(e,[{key:"getValue",value:function(){return this._value}},{key:"getTarget",value:function(){return this._target}},{key:"getSource",value:function(){return this._source}}]),e}();t["default"]=u},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=(t.ONE_JOINT_PER_CHANNEL_PAIR="two channels can have only one joint",t.NON_EXIST_CHANNEL="channel do not exist",t.UNIQUE_NAME_CHANNEL="channel need unique name");t.UNIQUE_NAME_INPUT_CHANNEL=n,t.UNIQUE_NAME_OUTPUT_CHANNEL=n}]);