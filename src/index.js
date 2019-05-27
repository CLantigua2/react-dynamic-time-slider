import React from 'react'
import InputRange from 'react-input-range'
import PropTypes from 'prop-types'
import moment from 'moment'
import './styles.css'

const minuteToTime = function (value, format = 12) {
    if (value === undefined) {
        throw new Error("Value must be defined react-modern-time-slider index.js line 7")
    }
    value = value > 1439 ? 1439 : value
    let hours = Math.floor(value / 60),
        minutes = value - hours * 60,
        ampm
    if (format === 12) {
        ampm = 'AM'
        if (hours >= 12) {
            if (hours !== 12) {
                hours = hours - 12
            }
            ampm = 'PM'
        }
        if (hours === 0) {
            hours = 12
        }
    }

    return { hours: hours, minutes: minutes, am_pm: ampm }
}

const timeToMinute = function (time, format = 12) {
    let rMinutes = 1439
    if (format === 24) {
        time = time.split(':')
        if (time.length < 2) {
            throw new Error('Invalid time react-modern-time-slider index.js line 31')
        }
        let hours = time[0],
            minutes = parseInt(time[1])
        hours = parseInt(hours * 60)
        rMinutes = hours + minutes
    } else {
        time = time.toUpperCase()
        time = time.replace(' ', '')
        // swaps AM and PM if beyond bound
        let ampm = time.indexOf('AM') !== -1 ? 'AM' : 'PM'
        time = time.replace(ampm, '')
        time = time.split(':')
        if (time.length < 2) {
            throw new Error('Invalid time react-modern-time-slider index.js line 49')
        }
        let hours = parseInt(time[0]),
            minutes = parseInt(time[1])
        if (ampm === 'PM') {
            if (hours !== 12) {
                hours = hours + 12
            }
        } else {
            hours = hours === 12 ? 0 : hours
        }
        hours = hours * 60
        rMinutes = hours + minutes
    }
    return rMinutes > 1439 ? 1439 : rMinutes
}

const formatHours = function (minutes) {
    if (minutes === undefined) {
        throw new Error("minutes is undefined react-modern-time-slider index.js line 67")
    }
    let clearMinutes = minutes < 0 ? 0 : minutes
    const time = minuteToTime(clearMinutes, 24)
    return moment({ ...time }).format('h:mm A')
}

const Slider = function (props) {
    const onChange = function ({ min, max }) {
        if (min === undefined) {
            throw new Error("start time is undefined react-modern-time-slider index.js line 77")
        }

        if (max === undefined) {
            throw new Error("end time is undefined react-modern-time-slider index.js line 77")
        }

        if (props.onChange === undefined) {
            throw new Error("Requires onChange prop react-modern-time-slider index.js line 86")
        }
        props.onChange({
            start: formatHours(min),
            end: formatHours(max)
        })
    }

    let { start, end } = props,
        min = timeToMinute(start),
        max = timeToMinute(end)

    if (props.minValue === undefined) {
        throw new Error('minValue is undefined react-modern-time-slider index.js line 99')
    }

    return (
        <InputRange
            disabled={props.disabled}
            draggableTrack={props.draggableTrack}
            minValue={timeToMinute(props.minValue)}
            maxValue={timeToMinute(props.maxValue)}
            onChange={onChange}
            step={props.step}
            value={{ min, max }}
            name={props.name}
            format={props.format}
        />
    )
}


Slider.defaultProps = {
    disabled: false,
    draggableTrack: true,
    format: 12,
    maxValue: '11:59pm',
    minValue: '12:00am',
    onChange: () => { },
    onChangeComplete: () => { },
    onChangeStart: () => { },
    step: 1
}

export default Slider

Slider.propTypes = {
    disabled: PropTypes.bool.isRequired,
    draggableTrack: PropTypes.bool.isRequired,
    minValue: PropTypes.string.isRequired,
    maxValue: PropTypes.string.isRequired,
    onChangeStart: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onChangeComplete: PropTypes.func.isRequired,
    format: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.object,
    step: PropTypes.number.isRequired
}