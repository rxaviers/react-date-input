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

const locale = "en";

storiesOf("Components", module)
  .add("DateInput", () => {
    return (
      <div>
        <style>{customStyle}</style>
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
