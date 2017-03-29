# react-date-input
---

Date Input UI component for React optimized for i18n and a11y.

## Screenshots

| locale | DateInput                                | MonthInput                               |
| ------ | ---------------------------------------- | ---------------------------------------- |
| en     | ![DateInputEn](http://i.giphy.com/l0HeqAujfZ7jaUd0c.gif) | ![MonthInputEn](http://i.giphy.com/3o6YgqnqyVsdKkEgKs.gif) |
| es     | ![DateInputEs](http://i.giphy.com/l0Hedc5O2Di02Qjlu.gif) | ![MonthInputEs](http://i.giphy.com/l0Hed4jAs5T0vZYQM.gif) |
| de     | ![DateInputDe](http://i.giphy.com/l0He20JY0bMa1kNva.gif) | ![MonthInputDe](http://i.giphy.com/3o6YgnMBvvkHhPl8Ig.gif) |
| zh     | ![DateInputZh](http://i.giphy.com/l0HebTS3rr1dTn4FG.gif) | ![MonthInputZh](http://i.giphy.com/l3q2H054KRaP6JRra.gif) |


## Features

* I18n support
* A11y support
* Style unoppinionated (no style provided)
* Supports IE9, IE9+, Chrome, Firefox & Safari

## Install

```bash
npm install --save react-date-input
```

## Usage

````js
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {DateInput, MonthInput} from 'react-date-input';

class App extends Component {
  render() {
    return (
      <form>
        <label>
          Date of birth:
          <DateInput />
        </label>
        <label>
          Month and year of establishment:
          <MonthInput />
        </label>
      </form>
    );
  }
}

ReactDOM.render(
    <App />,
    document.getElementById('container')
);
````

## API

### DateInput & MonthInput

#### Properties

| Name         | Type     | Default | Description                              |
| ------------ | -------- | ------- | ---------------------------------------- |
| defaultValue | date     | `null`  | Set initial value of the date input.     |
| value        | date     | `null`  | Set current value of the date input.     |
| onChange     | function |         | Called for each valid date change, taking one argument `date` |

## Development

```
npm install
npm run storybook
```

## Example

`npm start` and then go to `http://localhost:9001`

Online examples: TBD

## Test Case

TBD

## License

`react-date-input` is released under the MIT license © [Rafael Xavier de Souza](http://rafael.xavier.blog.br).