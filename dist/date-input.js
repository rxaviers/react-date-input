"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MonthInput = exports.DateInput = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var separators = "/.- ";

var LEFT = 37;
var UP = 38;
var RIGHT = 39;
var DOWN = 40;
var defaultDate = new Date(2016, 11, 28);

var get = {
  day: "getDate",
  month: "getMonth",
  year: "getFullYear"
};

var set = {
  day: "setDate",
  month: "setMonth",
  year: "setFullYear"
};

function noop() {}

function lastDay(date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

function noLiteral(_ref) {
  var type = _ref.type;

  return type !== "literal";
}

var DateInput = exports.DateInput = function (_Component) {
  _inherits(DateInput, _Component);

  function DateInput() {
    _classCallCheck(this, DateInput);

    return _possibleConstructorReturn(this, (DateInput.__proto__ || Object.getPrototypeOf(DateInput)).apply(this, arguments));
  }

  _createClass(DateInput, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(DateInputBase, _extends({}, this.props, { dateStyle: "date-short" }));
    }
  }]);

  return DateInput;
}(_react.Component);

var MonthInput = exports.MonthInput = function (_Component2) {
  _inherits(MonthInput, _Component2);

  function MonthInput() {
    _classCallCheck(this, MonthInput);

    return _possibleConstructorReturn(this, (MonthInput.__proto__ || Object.getPrototypeOf(MonthInput)).apply(this, arguments));
  }

  _createClass(MonthInput, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(DateInputBase, _extends({}, this.props, { dateStyle: "yM" }));
    }
  }]);

  return MonthInput;
}(_react.Component);

function throwNotImplementedPlugin() {
  throw new Error("Plugin your desired i18n library, e.g., import \"date-input/src/plugin-globalize\"");
}

var DateInputBase = function (_Component3) {
  _inherits(DateInputBase, _Component3);

  function DateInputBase(props) {
    _classCallCheck(this, DateInputBase);

    var _this3 = _possibleConstructorReturn(this, (DateInputBase.__proto__ || Object.getPrototypeOf(DateInputBase)).call(this, props));

    _this3.fmt = DateInputBase.createFormatter(props);
    _this3.parser = DateInputBase.createParser(props);
    _this3.numberFormatter = DateInputBase.createNumberFormatter(props);
    _this3.numberParser = DateInputBase.createNumberParser(props);
    _this3.placeholders = DateInputBase.getDisplayNames(props);
    _this3.state = {
      date: props.value || props.defaultValue || new Date()
    };

    // TODO: Reverse on RTL locale.
    _this3.NEXT = RIGHT;
    _this3.PREV = LEFT;

    _this3.myRefs = {};
    _this3.defaultValues = {};
    _this3.inputSizes = {};
    _this3.isInitialized = {};
    _this3.fmt(defaultDate).filter(noLiteral).forEach(function (_ref2) {
      var type = _ref2.type,
          value = _ref2.value;

      _this3.defaultValues[type] = value;
      _this3.inputSizes[type] = value.length;
      _this3.isInitialized[type] = !(props.value === null || props.defaultValue === null);
    });
    return _this3;
  }

  _createClass(DateInputBase, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(_ref3) {
      var _this4 = this;

      var value = _ref3.value;

      if (value === null) {
        this.fmt(defaultDate).filter(noLiteral).forEach(function (_ref4) {
          var type = _ref4.type;

          _this4.isInitialized[type] = false;
        });
      } else if (value) {
        this.setState({ date: value });
      }
    }
  }, {
    key: "handleChange",
    value: function handleChange(type) {
      var _this5 = this;

      var origDay = void 0,
          numericValue = void 0;
      var value = this.myRefs[type].value;
      var date = this.state.date;

      // Special handling for zero-padded numbers.
      // - backspacing zero-padded numbers, e.g., backspacing "03" becomes "0"
      //   that should actually be handled as "".
      // - trying to enter "30" takes the following steps:
      //   - enter 3, value changes from "" to "3" and formatted becomes "03";
      //   - enter 0, value changes from "03" to "030" (sliced "30") and formatted
      //     becomes "30". Note that it only works if sliced.

      if (value) {
        numericValue = this.numberParser(value);
        if (numericValue === 0) {
          value = "";
        } else {
          value = this.numberFormatter(numericValue);
        }
      }

      this.isInitialized[type] = !!value.length;

      // Special handling for type "month" and "year": handle day limit.
      if (type === "month" || type === "year") {
        date = new Date(date.getTime());
        origDay = date.getDate();
        date.setDate(1);
      }

      var aux = this.fmt(date).map(function (part) {
        if (part.type === type) {
          return { type: type, value: value };
        }
        return part;
      }).reduce(function (string, part) {
        var type = part.type,
            value = part.value;

        if (type === "literal") {
          return string + value;
        }
        value = _this5.isInitialized[type] ? value : _this5.defaultValues[type];
        return string + value;
      }, "");
      aux = this.parser(aux);

      if (aux) {

        // Special handling for type "month" and "year": handle day limit.
        if (type === "month" || type === "year") {
          aux.setDate(Math.min(origDay, lastDay(aux)));
        }

        this.setState({ date: aux });
        this.triggerOnChange(aux);
      }
    }
  }, {
    key: "handleKeyPress",
    value: function handleKeyPress(type, event) {
      // If key is a separator, focus next element.
      if (separators.indexOf(event.key) !== -1) {
        var next = this.move(type, "next");
        if (next) {
          this.myRefs[next.type].focus();
          this.myRefs[next.type].select();
        }
      }
    }
  }, {
    key: "handleKeyDown",
    value: function handleKeyDown(type, event) {
      var _this6 = this;

      if (event.keyCode === this.NEXT || event.keyCode === this.PREV) {
        (function () {
          var next = _this6.move(type, event.keyCode === _this6.NEXT ? "next" : "prev");
          if (next) {
            setTimeout(function () {
              _this6.myRefs[next.type].focus();
              _this6.myRefs[next.type].select();
            });
          }
        })();
      } else if (event.keyCode === UP || event.keyCode === DOWN) {
        var origDay = void 0;
        var date = new Date(this.state.date.getTime());
        event.preventDefault();
        if (type === "month" || type === "year") {
          origDay = date.getDate();
          date.setDate(1);
        }
        date[set[type]](+date[get[type]]() + (event.keyCode === UP ? 1 : -1));
        if (type === "month" || type === "year") {
          date.setDate(Math.min(origDay, lastDay(date)));
        }
        this.setState({ date: date });
        this.triggerOnChange(date);
      }
    }
  }, {
    key: "isValid",
    value: function isValid() {
      var _this7 = this;

      return Object.keys(this.isInitialized).map(function (type) {
        return _this7.isInitialized[type];
      }).every(function (value) {
        return value === true;
      });
    }
  }, {
    key: "move",
    value: function move(type, direction) {
      var aux = void 0;
      var parts = this.fmt(this.state.date);
      if (direction === "prev") {
        parts = parts.reverse();
      }
      return parts.filter(function (part) {
        if (aux && part.type !== "literal") {
          aux = false;
          return true;
        }
        if (part.type === type) {
          aux = true;
        }
        return false;
      })[0];
    }
  }, {
    key: "triggerOnChange",
    value: function triggerOnChange(date) {
      var _props$onChange = this.props.onChange,
          onChange = _props$onChange === undefined ? noop : _props$onChange;

      if (!this.isValid()) {
        return;
      }
      onChange(date);
    }
  }, {
    key: "render",
    value: function render() {
      var _this8 = this;

      var _props = this.props,
          className = _props.className,
          style = _props.style,
          locale = _props.locale;

      var parts = this.fmt(this.state.date);

      return _react2.default.createElement(
        "div",
        { lang: locale, className: className, style: style },
        parts.map(function (part, i) {
          var type = part.type,
              value = part.value;

          if (type === "literal") {
            return _react2.default.createElement(
              "span",
              { key: i },
              value
            );
          }
          value = _this8.isInitialized[type] ? value : "";
          return _react2.default.createElement("input", {
            key: i,
            ref: function ref(self) {
              return _this8.myRefs[type] = self;
            },
            name: type,
            value: value,
            onChange: _this8.handleChange.bind(_this8, type),
            onKeyDown: _this8.handleKeyDown.bind(_this8, type),
            onKeyPress: _this8.handleKeyPress.bind(_this8, type),
            placeholder: _this8.placeholders[type],
            size: _this8.inputSizes[type]
          });
        })
      );
    }
  }]);

  return DateInputBase;
}(_react.Component);

DateInputBase.createFormatter = throwNotImplementedPlugin;
DateInputBase.createParser = throwNotImplementedPlugin;
DateInputBase.createNumberFormatter = throwNotImplementedPlugin;
DateInputBase.createNumberParser = throwNotImplementedPlugin;
DateInputBase.getDisplayNames = throwNotImplementedPlugin;
DateInputBase.propTypes = {
  className: _react.PropTypes.string,
  defaultValue: _react.PropTypes.instanceOf(Date),
  locale: _react.PropTypes.string,
  onChange: _react.PropTypes.func,
  style: _react.PropTypes.object,
  value: _react.PropTypes.instanceOf(Date)
};
exports.default = DateInputBase;
//# sourceMappingURL=date-input.js.map