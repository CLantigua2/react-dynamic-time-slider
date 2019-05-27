import React from 'react';
import ReactDOM from 'react-dom';
import Slider from './index.js';

const day = {
    name: 'Tuesday',
    start: "9:00 AM", // set your start time to be the minimum value of the day
    end: "5:00 PM", // set your end time to be the maximum value of the day
    closed: "off", // dynamically set to on or off to disable slider
    id: 1,
}

describe('Slider Component', () => {
    it('Slider renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Slider name={day.name} draggableTrack={true} start={day.start} end={day.end} />, div);
    });
})
