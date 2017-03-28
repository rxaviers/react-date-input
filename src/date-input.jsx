import React, {Component, PropTypes} from "react";

const separators = "/.- ";

const LEFT = 37;
const UP = 38;
const RIGHT = 39;
const DOWN = 40;

const get = {
  day: "getDate",
  month: "getMonth",
  year: "getFullYear"
};

const set = {
  day: "setDate",
  month: "setMonth",
  year: "setFullYear"
};

function noop() {}

function lastDay(date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

export class DateInput extends Component {
  render() {
    return (
      <DateInputBase {...this.props} style="date-short" />
    );
  }
}

export class MonthInput extends Component {
  render() {
    return (
      <DateInputBase {...this.props} style="yM" />
    );
  }
}

function throwNotImplementedPlugin() {
  throw new Error(
    "Plugin your desired i18n library, e.g., import \"date-input/src/plugin-globalize\""
  );
}

export default class DateInputBase extends Component {
  static createFormatter = throwNotImplementedPlugin;
  static createParser = throwNotImplementedPlugin;
  static createNumberParser = throwNotImplementedPlugin;
  static getDisplayNames = throwNotImplementedPlugin;

  static propTypes = {
    locale: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.instanceOf(Date)
  };

  constructor(props) {
    super(props);
    this.fmt = DateInputBase.createFormatter(props);
    this.parser = DateInputBase.createParser(props);
    this.numberParser = DateInputBase.createNumberParser(props);
    this.placeholders = DateInputBase.getDisplayNames(props);
    this.state = {
      date: props.value || new Date()
    };

    // TODO: Reverse on RTL locale.
    this.NEXT = RIGHT;
    this.PREV = LEFT;

    this.myRefs = {};
    this.defaultValues = {};
    this.inputSizes = {};
    this.isInitialized = {};
    this.fmt(new Date(2016, 11, 28)).forEach(({type, value}) => {
      this.defaultValues[type] = value;
      this.inputSizes[type] = value.length;
      this.isInitialized[type] = true;
    });
  }

  handleChange(type) {
    let origDay;
    let {value} = this.myRefs[type];
    let {date} = this.state;

    // Special handling for backspacing zero-padded numbers, e.g., backspacing
    // "03" becomes "0" that should actually be handled as "".
    if (this.numberParser(value) === 0) {
      value = "";
    }
    this.isInitialized[type] = !!value.length;

    // Special handling for value whose type !== "year", pick last two digits.
    // For example, "030" becomes "30".
    //
    // This is needed because some locales use zero-padded fields, therefore
    // trying to enter "30" takes the following steps:
    // - enter 3, value changes from "" to "3" and formatted becomes "03";
    // - enter 0, value changes from "03" to "030" (sliced "30") and formatted
    //   becomes "30". Note that it only works if sliced.
    if (type !== "year") {
      value = value.slice(-2);
    }

    // Special handling for type "month" and "year": handle day limit.
    if (type === "month" || type === "year") {
      date = new Date(date.getTime());
      origDay = date.getDate();
      date.setDate(1);
    }

    let aux = this.fmt(date).map(part => {
      if (part.type === type) {
        return {type, value};
      }
      return part;
    }).reduce((string, part) => {
      let {type, value} = part;
      if (type === "literal") {
        return string + value;
      }
      value = this.isInitialized[type] ? value : this.defaultValues[type];
      return string + value;
    }, "");
    aux = this.parser(aux);

    if (aux) {

      // Special handling for type "month" and "year": handle day limit.
      if (type === "month" || type === "year") {
        aux.setDate(Math.min(origDay, lastDay(aux)));
      }

      this.setState({date: aux});
      this.triggerOnChange(aux);
    }
  }

  handleKeyPress(type, event) {
    // If key is a separator, focus next element.
    if (separators.indexOf(event.key) !== -1) {
      let next = this.move(type, "next");
      if (next) {
        this.myRefs[next.type].focus();
        this.myRefs[next.type].select();
      }
    }
  }

  handleKeyDown(type, event) {
    if (event.keyCode === this.NEXT || event.keyCode === this.PREV) {
      let next = this.move(type, event.keyCode === this.NEXT ? "next" : "prev");
      if (next) {
        setTimeout(() => {
          this.myRefs[next.type].focus();
          this.myRefs[next.type].select();
        });
      }
    } else if (event.keyCode === UP || event.keyCode === DOWN) {
      let origDay;
      let date = new Date(this.state.date.getTime());
      event.preventDefault();
      if (type === "month" || type === "year") {
        origDay = date.getDate();
        date.setDate(1);
      }
      date[set[type]](+ date[get[type]]() + (event.keyCode === UP ? 1 : -1));
      if (type === "month" || type === "year") {
        date.setDate(Math.min(origDay, lastDay(date)));
      }
      this.setState({date});
      this.triggerOnChange(date);
    }
  }

  isValid() {
    return Object.keys(this.isInitialized)
      .map(type => this.isInitialized[type])
      .every(value => value === true);
  }

  move(type, direction) {
    let aux;
    let parts = this.fmt(this.state.date);
    if (direction === "prev") {
      parts = parts.reverse();
    }
    return parts.filter(part => {
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

  triggerOnChange(date) {
    const {onChange = noop} = this.props;
    if (!this.isValid()) {
      onChange(null);
      return;
    }
    onChange(date);
  }

  render() {
    const parts = this.fmt(this.state.date);

    return (
      <div lang={this.props.locale}>
        {parts.map(part => {
          let {type, value} = part;
          if (type === "literal") {
            return (
              <span>{value}</span>
            );
          }
          value = this.isInitialized[type] ? value : "";
          return (
            <input
              ref={self => this.myRefs[type] = self}
              name={type}
              value={value}
              onChange={this.handleChange.bind(this, type)}
              onKeyDown={this.handleKeyDown.bind(this, type)}
              onKeyPress={this.handleKeyPress.bind(this, type)}
              placeholder={this.placeholders[type]}
              size={this.inputSizes[type]}
            />
          );
        })}
      </div>
    );
  }
}
