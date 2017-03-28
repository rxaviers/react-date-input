import DateInput from "./date-input";
import Globalize from "globalize";

function globalizeOptions({style, timeZone}) {
  let aux;
  let options = {timeZone};

  aux = style.split("-");
  if (aux.length > 1) {
    options[aux[0]] = aux[1];
  } else {
    options.skeleton = style;
  }

  return options;
}

DateInput.createFormatter = function(props) {
  return new Globalize(props.locale).dateToPartsFormatter(
    globalizeOptions(props)
  );
};

DateInput.createParser = function(props) {
  return new Globalize(props.locale).dateParser(
    globalizeOptions(props)
  );
};

DateInput.createNumberParser = function(props) {
  return new Globalize(props.locale).numberParser();
};

DateInput.getDisplayNames = function(props) {
  let globalize = new Globalize(props.locale);
  return {
    day: globalize.cldr.main('dates/fields/day-narrow/displayName'),
    month: globalize.cldr.main('dates/fields/month-narrow/displayName'),
    year: globalize.cldr.main('dates/fields/year-narrow/displayName')
  };
};
