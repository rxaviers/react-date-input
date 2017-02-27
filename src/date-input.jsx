import Globalize from "globalize";
import React, { Component, PropTypes } from "react";

const separators = "/.- ";

function noop() {}

export class DateInput extends Component {
  render() {
    return (
      <DateInputBase {...this.props} style="yMd" />
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

export default class DateInputBase extends Component {
  static createFormatter = function(props) {
    let formatter;
    if (props.style === "yM") {
      formatter = new Intl.DateTimeFormat(props.locale, {
        year: "numeric",
        month: "numeric"
      });
    } else {
      formatter = new Intl.DateTimeFormat(props.locale);
    }
    return formatter.formatToParts.bind(formatter);
  }

  static createParser = function(props) {
    return new Globalize(props.locale).dateParser({skeleton: props.style});
  }

  static getDisplayNames = function(props) {
    var globalize = new Globalize(props.locale);
    return {
      day: globalize.cldr.main('dates/fields/day-narrow/displayName'),
      month: globalize.cldr.main('dates/fields/month-narrow/displayName'),
      year: globalize.cldr.main('dates/fields/year-narrow/displayName')
    };
  }

  constructor(props) {
    super(props);
    this.fmt = DateInputBase.createFormatter(props);
    this.parser = DateInputBase.createParser(props);
    this.placeholders = DateInputBase.getDisplayNames(props);
    this.state = {
      date: props.value || new Date()
    };
    this.myRefs = {};
    this.defaultValues = {};
    this.isInitialized = {}
    this.fmt(new Date(2015,0,1)).forEach(({type, value}) => {
      this.defaultValues[type] = value;
      this.isInitialized[type] = true;
    });
  }

  handleChange(type) {
    let origDay;
    const {value} = this.myRefs[type];
    let {date} = this.state;
    const {onChange = noop} = this.props;
    this.isInitialized[type] = !!value.length;

    // Special handling for type "month": handle day limit.
    if (type === "month") {
      date = new Date(date.getTime());
      origDay = date.getDate();
      date.setDate(1);
    }

    let aux = this.fmt(date).map(part => {
      if (part.type === type) {
        return {type, value}
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

      // Special handling for type "month": handle day limit.
      if (type === "month") {
        let day = origDay;
        let lastDay = new Date( aux.getFullYear(), aux.getMonth() + 1, 0 ).getDate();
        aux.setDate(day < lastDay ? day : lastDay);
      }

      this.setState({date: aux});
      onChange(aux);
    }
  }

  handleKeyPress(type, event) {
    // If key is a separator, focus next element.
    if (separators.indexOf(event.key) !== -1) {
      let aux = false;
      let next = this.fmt(this.state.date).filter(part => {
        if (aux && part.type !== "literal") {
          aux = false;
          return true;
        }
        if (part.type === type) {
          aux = true;
        }
        return false;
      })[0];
      if (next) {
        this.myRefs[next.type].focus();
      }
    }
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
              onKeyPress={this.handleKeyPress.bind(this, type)}
              placeholder={this.placeholders[type]}
            />
          );
        })}
      </div>
    );
  }
}
