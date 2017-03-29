"use strict";

var _dateInput = require("./date-input");

var _dateInput2 = _interopRequireDefault(_dateInput);

var _globalize = require("globalize");

var _globalize2 = _interopRequireDefault(_globalize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function globalizeOptions(_ref) {
  var dateStyle = _ref.dateStyle,
      timeZone = _ref.timeZone;

  var aux = void 0;
  var options = { timeZone: timeZone };

  aux = dateStyle.split("-");
  if (aux.length > 1) {
    options[aux[0]] = aux[1];
  } else {
    options.skeleton = dateStyle;
  }

  return options;
}

_dateInput2.default.createFormatter = function (props) {
  return _globalize2.default.dateToPartsFormatter(globalizeOptions(props));
};

_dateInput2.default.createParser = function (props) {
  return _globalize2.default.dateParser(globalizeOptions(props));
};

_dateInput2.default.createNumberFormatter = function () {
  return _globalize2.default.numberFormatter();
};

_dateInput2.default.createNumberParser = function () {
  return _globalize2.default.numberParser();
};

_dateInput2.default.getDisplayNames = function () {
  return {
    day: _globalize2.default.cldr.main("dates/fields/day-narrow/displayName"),
    month: _globalize2.default.cldr.main("dates/fields/month-narrow/displayName"),
    year: _globalize2.default.cldr.main("dates/fields/year-narrow/displayName")
  };
};
//# sourceMappingURL=plugin-globalize.js.map