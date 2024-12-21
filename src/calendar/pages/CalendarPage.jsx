import { Calendar } from 'react-big-calendar'
import { CalendarEvent, CalendarModal, FabAddNew, Navbar, FabDelete } from "../"
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { getMessagesES, localizer} from '../../helpers'
import { useState } from 'react'
import { useUIStore, useCalendarStore } from '../../hooks'




export const CalendarPage = () => {


  const { events, setActiveEvent } = useCalendarStore();
  const [lastView, setlastView] = useState(localStorage.getItem('lastView') || 'month')
  const {openDateModal} = useUIStore()


  const eventStyleGetter = () => {

    const style = {
      backgroundColor: '#367CF7',
      borderRadius: '5px',
      opacity: 0.9,
      color: 'white'
    }

    return{
      style
    }
  }


  const onDoubleClick = (e) => {
    console.log({doubleClick: e})
    openDateModal()
  }

  const onSelectEvent = (e) => {
    setActiveEvent(e)
  }

  const onView = (e) => {
    localStorage.setItem('lastView', e)
    setlastView(e)
  }


  return (
    <>
    
      <Navbar/>

      <Calendar
        culture='es'
        localizer={localizer}
        events={ events }
        defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(100vh - 80px)' }}
        messages={getMessagesES()}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelectEvent}
        onView={onView}
      />

      <CalendarModal/>
      <FabAddNew/>
      <FabDelete/>

    </>
  )
}
