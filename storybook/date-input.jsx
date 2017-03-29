import React from "react";
import { storiesOf, action } from "@kadira/storybook";
import {DateInput, MonthInput} from "../src/date-input";
import "../src/plugin-globalize";

function onChange(date) {
  action("Date changed to")(date === null ? null : date.toString());
}

const minimalStyle = `
  * {
    font-size: 20px;
  }
  span {
    padding: 0 0.2em;
  }
`;

const customStyle = `
  * {
    font-size: 20px;
  }
  .input {
    border: 1px solid #ccc;
    display: inline-block;
    padding: 0.2em;
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
  span {
    padding: 0 0.2em;
  }
`;

const locale = "en";

storiesOf("Components", module)
  .add("Basic", () => {
    return (
      <div lang="en">
        <style>{minimalStyle}</style>

        <h2>DateInput</h2>
        <p>Initially empty</p>
        <DateInput locale={locale} defaultValue={null} onChange={onChange} />
        <p>Initialized with today (default)</p>
        <DateInput locale={locale} onChange={onChange} />
        <p>Initialized with an arbitrary date</p>
        <DateInput locale={locale} defaultValue={new Date(1982, 0, 2)} onChange={onChange} />

        <hr style={{margin: "3em 0"}}/>

        <h2>MonthInput</h2>
        <p>Initially empty</p>
        <MonthInput locale={locale} defaultValue={null} onChange={onChange} />
        <p>Initialized with today (default)</p>
        <MonthInput locale={locale} onChange={onChange} />
        <p>Initialized with an arbitrary date</p>
        <MonthInput locale={locale} defaultValue={new Date(1982, 0)} onChange={onChange} />

      </div>
    );
  })
  .add("Custom style", () => {
    return (
      <div>
        <style>{customStyle}</style>

        <h2>DateInput</h2>
        <p>Initially empty</p>
        <DateInput className="input" locale={locale} defaultValue={null} onChange={onChange} />
        <p>Initialized with today (default)</p>
        <DateInput className="input" locale={locale} onChange={onChange} />
        <p>Initialized with an arbitrary date</p>
        <DateInput className="input" locale={locale} defaultValue={new Date(1982, 0, 2)} onChange={onChange} />

        <hr style={{margin: "3em 0"}}/>

        <h2>MonthInput</h2>
        <p>Initially empty</p>
        <MonthInput className="input" locale={locale} defaultValue={null} onChange={onChange} />
        <p>Initialized with today (default)</p>
        <MonthInput className="input" locale={locale} onChange={onChange} />
        <p>Initialized with an arbitrary date</p>
        <MonthInput className="input" locale={locale} defaultValue={new Date(1982, 0)} onChange={onChange} />

      </div>
    );
  });
