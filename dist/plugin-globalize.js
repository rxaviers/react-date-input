"use strict";

var _dateInput = require("./date-input");

var _dateInput2 = _interopRequireDefault(_dateInput);

var _globalize = require("globalize");

var _globalize2 = _interopRequireDefault(_globalize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function globalizeOptions(_ref) {
  var style = _ref.style,
      timeZone = _ref.timeZone;

  var aux = void 0;
  var options = { timeZone: timeZone };

  aux = style.split("-");
  if (aux.length > 1) {
    options[aux[0]] = aux[1];
  } else {
    options.skeleton = style;
  }

  return options;
}

_dateInput2.default.createFormatter = function (props) {
  return new _globalize2.default(props.locale).dateToPartsFormatter(globalizeOptions(props));
};

_dateInput2.default.createParser = function (props) {
  return new _globalize2.default(props.locale).dateParser(globalizeOptions(props));
};

_dateInput2.default.createNumberParser = function (props) {
  return new _globalize2.default(props.locale).numberParser();
};

_dateInput2.default.getDisplayNames = function (props) {
  var globalize = new _globalize2.default(props.locale);
  return {
    day: globalize.cldr.main("dates/fields/day-narrow/displayName"),
    month: globalize.cldr.main("dates/fields/month-narrow/displayName"),
    year: globalize.cldr.main("dates/fields/year-narrow/displayName")
  };
};
//# sourceMappingURL=plugin-globalize.js.map