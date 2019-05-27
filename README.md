# React Modern Time Slider

[![Build Status](https://travis-ci.org/CLantigua2/react-modern-time-slider.svg?branch=master)](https://travis-ci.org/CLantigua2/react-modern-time-slider)


Forked slider from <a href="https://github.com/ashvin27/react-time-range-slider" target="_blank">React-time-range-slider by ashvin27</a>.
This slider was altered to be more modular. This allows you to inject as many as you need on a page while maintaining individual functionality for each instance. It is meant to output 12 hour AM/PM formatted time.


<img src="https://github.com/CLantigua2/react-modern-time-slider/blob/master/slider.PNG" width="800">

This slider was made to serve a very general puprose

* Takes in a number value in the format of "hh:mm AM/PM"
* Easy to map over state and add on to multiple days if needed
* Written to work with function hooks components or React classes

## Usage

Import to use inside your component. Can be used with a class or functional (hooks) component.

```js
import Slider from 'react-modern-time-slider'
```

### React Class Component Example
```jsx
class App extends Component {
  constructor() {
    super()
    this.state = {
      days: [
        {
          name: 'Sunday (disabled)',
          start: "9:00 AM",
          end: "5:00 PM",
          closed: true,
          step: 1,
          id: 1,
        }
      ]
    }
    this.submitHandler = this.submitHandler.bind(this)
    this.timeChangeHandler = this.timeChangeHandler.bind(this)
  }

  timeChangeHandler(time, targetDay) {
      /*
      time is an object that holds both start and end time.
      it will look like time: {start: start, end: end}
        you can either destructure it
      ex. const { start, end } = time
            or pass it as time.start and time.end
       */
    this.setState(prevState => {
      return {
        days: prevState.days.map(day => {
          if (day.name === targetDay.name) {
            return { ...day, start: time.start, end: time.end, updated: true }
          } else {
            return day
          }
        })
      }
    })
  }

  render() {
    return (
      <div>
        {
          this.state.days.map((day, i) => {
            return (
              <div key={i}>
              // Slider starts here 👇
                <Slider
                  disabled={day.closed}
                  draggableTrack={true}
                  start={day.start}
                  end={day.end}
                  name={day.name}
                  onChangeComplete={time => this.onChangeComplete(time, day)}
                  onChange={time => this.timeChangeHandler(time, day)}
                  onChangeStart={this.changeStartHandler}
                  step={day.step}
                />
              </div>
            )
          })
        }
      </div >
    )
  }
}

export default App;
```

### Slider component
```jsx
<Slider
    disabled={Boolean} // not required
    draggableTrack={Boolean} // not required
    start={String} // isRequired ex. "8:45 AM"
    end={String} // [String] isRequired ex. "9:15 PM"
    name={String} // [String] isRequired ex. "Monday"
    onChangeComplete={time => onChangeComplete(time, String)} // [Func(time, String)] isRequired
    onChange={time => timeChangeHandler(time, String)} // [Func(time, String)] isRequired
    onChangeStart={changeStartHandler} // [Func] isRequired
    step={Number} // [Int] not required
/>
```

### Options

### Looking to contribute or roll your own?
You can fork or clone this repo.

#### Step 1.

Install dependencies

`npm install` or `yarn install`

#### Step 2.

Start development server

`npm start` or `yarn start`

Runs the demo app in development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Library files

All library files are located inside `src/lib`

## Demo app

Is located inside `src/demo` directory, here you can test your library while developing

## Testing

`npm run test` or `yarn run test`

## Build library

`npm run build` or `yarn run build`

Produces production version of library under the `build` folder.

