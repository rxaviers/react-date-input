import React from "react"
import { storiesOf, action } from "@kadira/storybook"
import {DateInput, MonthInput} from "../src/date-input"

function onChange(date) {
  action('Date changed to')(date.toString());
}

const customStyle = `
  * {
    font-size: 20px;
  }
  input[name=year] {
    width: 4em;
  }
  input[name=month] {
    width: 2em;
  }
  input[name=day] {
    width: 2em;
  }
  span {
    padding: 0 0.2em;
  }
`;

const customStyle2 = `
  * {
    font-size: 20px;
  }
  input {
    -moz-appearance: none;
    background: rgba(0, 0, 0, 0) none repeat scroll 0 0;
    border: 0px solid #aaa;
    border-radius: 6px;
    box-sizing: content-box;
    display: inline-block !important;
    padding: 0.1em;
    line-height: 1em;
  }
  input:focus {
    background-color: #9cf;
  }
  input[name=year] {
    width: 2.8em;
  }
  input[name=month], input[name=day] {
    width: 1.4em;
  }
  span {
    padding: 0 0.2em;
  }
`;

const locale = "de";

storiesOf("Components", module)
  .add("DateInput", () => {
    return (
      <div>
        <style>{customStyle}</style>
        <DateInput locale={locale} onChange={onChange} />
      </div>
    );
  })
  .add("DateInput style2", () => {
    return (
      <div style={{border: "1px solid #ccc", display: "inline-block", padding: "0.2em"}}>
        <style>{customStyle2}</style>
        <DateInput locale={locale} onChange={onChange} />
      </div>
    );
  })
  .add("MonthInput", () => {
    return (
      <div>
        <style>{customStyle}</style>
        <MonthInput locale={locale} onChange={onChange} />
      </div>
    );
  })
  .add("MonthInput style2", () => {
    return (
      <div style={{border: "1px solid #ccc", display: "inline-block", padding: "0.2em"}}>
        <style>{customStyle2}</style>
        <MonthInput locale={locale} onChange={onChange} />
      </div>
    );
  });
