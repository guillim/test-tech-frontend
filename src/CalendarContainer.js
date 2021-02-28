import React from 'react'
import {useState,useEffect} from 'react'
import { Calendar, Views, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import Swal from 'sweetalert2'

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
    Swal.mixin({
      input: 'text',
      confirmButtonText: 'Next &rarr;',
      showCancelButton: true,
      progressSteps: ['1', '2']
    }).queue([
      {
        title: 'Your name',
        text: ''
      },
      {
        title: 'Subject of the meeting',
        text: ''
      }
    ]).then((result) => {
      console.log('result.value',result.value);
      console.log('start',start);
      if (result.value) {
        const answers = JSON.stringify(result.value)
        const meeting = {
          "topic": result.value[0] +' - '+ result.value[1],
          "type": 2,
          "start_time": moment(start).toDate(),
          "duration": moment.duration(moment(end).diff(moment(start))).as('minutes'),
          "timezone": "Europe/Paris",
          "password": "avizio",
          "agenda":  result.value[0] + ", your zoom is scheduled for " + result.value[1]
        }

        fetch('http://localhost:4000/meetings/new',{
          method : 'POST',
          headers:{'Content-Type': 'application/json'},
          body: JSON.stringify(meeting)
        })
        .then( res => {
          if(!res.ok){
            throw Error('pb insinde server')
          }
          return res.json()
        })
        .then(res => {
          console.log('here we are',res)
          Swal.fire({
            title: 'Meeting booked! You can quit this page',
            html: `Remember your password : ${res.meeting.password} <p>Start at: ${res.meeting.start_time}</p><p>Join at: ${res.meeting.join_url}</p>`,
            confirmButtonText: 'Finished!'
          })
        })
        .catch(e => {
          console.log(e)
          Swal.fire({
            title: 'We had a problem',
            html: `Sorry`,
            confirmButtonText: 'Try again'
          })
        })
      }
    })
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
        onSelectEvent={event => Swal.fire(event.title)}
        onSelectSlot={handleSelect}
      />
    </div>
  )
}

export default CalendarContainer
