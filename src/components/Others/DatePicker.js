import React from 'react'
import PropTypes from 'prop-types'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const DatePickerComponent = ({
  minDate, maxDate, startDate, endDate, onChangeStart, onChangeEnd,
}) => (
  <>
    <DatePicker
      selectsStart
      // min-max
      minDate={minDate}
      maxDate={maxDate}
      // start-end
      startDate={startDate}
      endDate={endDate}
      // selected
      selected={startDate}
      // callback
      onChange={(date) => onChangeStart(date)}
    />
    <DatePicker
      selectsEnd
      // min-max
      minDate={startDate}
      maxDate={maxDate}
      // start-end
      startDate={startDate}
      endDate={endDate}
      // selected
      selected={endDate}
      // callback
      onChange={(date) => onChangeEnd(date)}
    />
  </>
)

DatePickerComponent.propTypes = {
  minDate: PropTypes.instanceOf(Date).isRequired,
  maxDate: PropTypes.instanceOf(Date).isRequired,
  startDate: PropTypes.instanceOf(Date).isRequired,
  endDate: PropTypes.instanceOf(Date).isRequired,
  onChangeStart: PropTypes.func.isRequired,
  onChangeEnd: PropTypes.func.isRequired,
}

export default DatePickerComponent
