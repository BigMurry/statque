'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

module.exports = function () {
  function SQ(status) {
    _classCallCheck(this, SQ);

    this.handlers = [];
    this.props = {};
    this.defaultStatus = status;
  }

  _createClass(SQ, [{
    key: 'use',
    value: function use(fn) {
      if (typeof fn === 'function') {
        this.handlers.push(fn);
      }
    }
  }, {
    key: 'bind',
    value: function bind(props) {
      this.props = props;
    }
  }, {
    key: 'get',
    value: function get(key) {
      return run(this, key);
    }
  }]);

  return SQ;
}();

function run(ctx, key) {
  var handlers = ctx.handlers.slice();
  var status = isObj(ctx.defaultStatus) ? Object.assign({}, ctx.defaultStatus) : ctx.defaultStatus;
  ctx = { props: ctx.props };
  function next(key, status) {
    if (handlers.length !== 0) {
      var h = handlers.shift();
      status = h.call(ctx, key, status);
      return next(key, status);
    } else {
      return status;
    }
  }
  return next(key, status);
}

function isObj(obj) {
  return !!obj && obj.toString() === '[object Object]';
}