import React from 'react'

import { Calendar, Views, momentLocalizer } from 'react-big-calendar'
// import events from '../events'
// import ExampleControlSlot from '../ExampleControlSlot'
import moment from 'moment'
const localizer = momentLocalizer(moment)
const propTypes = {}


class CalendarContainer extends React.Component {
  constructor(...args) {
    super(...args)

    // this.state = { events }
  }

  handleSelect = ({ start, end }) => {
    const title = window.prompt('New Event name')
    if (title){
      console.log('ere we go');
    }
      // this.setState({
      //   events: [
      //     ...this.state.events,
      //     {
      //       start,
      //       end,
      //       title,
      //     },
      //   ],
      // })
  }

  render() {

    // const { localizer } = this.props
    return (
      <div className="calendarContainer">

        <Calendar
          selectable
          localizer={localizer}
          events={[]}
          defaultView={Views.WEEK}
          scrollToTime={new Date(1970, 1, 1, 6)}
          defaultDate={new Date(2015, 3, 12)}
          onSelectEvent={event => alert(event.title)}
          onSelectSlot={this.handleSelect}
        />
      </div>
    )
  }
}

CalendarContainer.propTypes = propTypes

export default CalendarContainer
