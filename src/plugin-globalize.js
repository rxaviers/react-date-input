import DateInput from "./date-input";
import Globalize from "globalize";

function globalizeOptions({dateStyle, timeZone}) {
  let aux;
  let options = {timeZone};

  aux = dateStyle.split("-");
  if (aux.length > 1) {
    options[aux[0]] = aux[1];
  } else {
    options.skeleton = dateStyle;
  }

  return options;
}

DateInput.createFormatter = function(props) {
  return Globalize.dateToPartsFormatter(
    globalizeOptions(props)
  );
};

DateInput.createParser = function(props) {
  return Globalize.dateParser(
    globalizeOptions(props)
  );
};

DateInput.createNumberFormatter = function() {
  return Globalize.numberFormatter();
};

DateInput.createNumberParser = function() {
  return Globalize.numberParser();
};

DateInput.getDisplayNames = function() {
  return {
    day: Globalize.cldr.main("dates/fields/day-narrow/displayName"),
    month: Globalize.cldr.main("dates/fields/month-narrow/displayName"),
    year: Globalize.cldr.main("dates/fields/year-narrow/displayName")
  };
};
