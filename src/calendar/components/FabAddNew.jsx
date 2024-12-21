import React from 'react'
import { useCalendarStore, useUIStore } from '../../hooks'
import { addHours } from 'date-fns'

export const FabAddNew = () => {

  const {openDateModal} = useUIStore()
  const {setActiveEvent} = useCalendarStore()


  const handleClick = () => {
    setActiveEvent({
        title: '',
        notes: '',
        start: new Date(),
        end: addHours(new Date(), 2),
        bgColor: '#fafafa',
        user: {
          _id: '123',
          name: 'Jair'
        }
    })
    openDateModal()
  }




  return (
    <button
        className='btn btn-primary fab'
        onClick={handleClick}
    >
        <i className='fas fa-plus'></i>
    </button>
  )
}
