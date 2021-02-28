import React from 'react'
import {useState,useEffect} from 'react'
import { Calendar, Views, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'

const localizer = momentLocalizer(moment)


const CalendarContainer = ({data}) => {
  let meetings = []
  if (data?.meetings?.meetings) {
    meetings = data.meetings.meetings
    meetings = meetings.map(m => {
      return {
      id: m.id,
      title:m.agenda,
      allDay: false,
      start: moment(m.start_time).utc().toDate(),
      end: moment(m.start_time).add(m.duration,'minutes').utc().toDate()
      }
    })
  }
  const [events, setEvents] = useState(meetings)

  const handleSelect = ({ start, end }) => {
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


  return (
    <div className="calendarContainer">

      <Calendar
        selectable
        localizer={localizer}
        events={events}
        defaultView={Views.WEEK}
        scrollToTime={new Date(2021, 1, 1, 6)}
        defaultDate={new Date()}
        onSelectEvent={event => alert(event.title)}
        onSelectSlot={handleSelect}
      />
    </div>
  )
}

export default CalendarContainer
