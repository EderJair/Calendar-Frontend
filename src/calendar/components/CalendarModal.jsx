import { addHours, differenceInSeconds, set } from "date-fns";
import { useEffect, useMemo, useState } from "react";
import Modal from "react-modal"
import Swal from "sweetalert2";
import 'sweetalert2/dist/sweetalert2.min.css'
import DatePicker, {registerLocale} from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { es } from "date-fns/locale";
import { useUIStore } from "../../hooks/useUiStore";
import { useCalendarStore } from "../../hooks";


registerLocale('es', es)


const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');


export const CalendarModal = () => {

  const {isDateModalOpen, closeDateModal} = useUIStore()
  const [formSubmited, setformSubmited] = useState(false)
  const { activeEvent, startSavingEvent } = useCalendarStore()

  const [formValues, setformValues] = useState({
    title: 'Jair',
    notes: 'Quispe',
    start: new Date(),
    end: addHours(new Date(), 2)
  })

  const titleClass = useMemo(() => {

    if (!formSubmited) return '';

    return (formValues.title.length > 0)
            ? '' 
            : 'is-invalid';

  }, [formValues.title, formSubmited])


  useEffect(() => {
    
    if(activeEvent !== null) {
      setformValues({...activeEvent})
    }
  
  }, [activeEvent])
  

  const onInputChange = ({target}) => {
    setformValues({
      ...formValues,
      [target.name]: target.value
    })
  }

  const onDateChange = (e, changing) => {
    setformValues({
      ...formValues,
      [changing]: e
    })
  }


  const closeModal = () => {
    closeDateModal();
  }


  const onSubmit = async(e) => {
    e.preventDefault()
    setformSubmited(true)
    
    const difference = differenceInSeconds(formValues.end, formValues.start)
    
    if(isNaN(difference) || difference < 0) {
      Swal.fire(
        'Fechas incorrectas',
        'La fecha fin debe ser mayor a la fecha de inicio',
        'error'
      )
      return
    }

    if(formValues.title.length < 0) {
      return
    }

    //todo: cerrar modal

    await startSavingEvent(formValues)
    closeDateModal()
    setformSubmited(false)

  }


  return (
    <Modal
      isOpen={isDateModalOpen}
      onRequestClose={closeModal}
      style={customStyles}
      className='modal'
      overlayClassName='modal-fondo'
      closeTimeoutMS={200}
    >
      <h1> Nuevo evento </h1>
        <hr />
        <form className="container" onSubmit={onSubmit}>
            <div className="form-group mb-2">
                <label>Fecha y hora inicio</label>
                <br />
                <DatePicker
                  selected={formValues.start}
                  onChange={(e) =>  onDateChange(e, 'start')}
                  className="form-control"
                  dateFormat='Pp'
                  showTimeSelect
                  locale={es}
                  timeCaption="Hora"
                />
            </div>

            <div className="form-group mb-2">
                <label>Fecha y hora fin</label>
                <br />
                <DatePicker
                  minDate={formValues.start}
                  selected={formValues.end}
                  onChange={(e) =>  onDateChange(e, 'end')}
                  className="form-control"
                  dateFormat='Pp'
                  showTimeSelect
                  locale={es}
                  timeCaption="Hora"
                />
            </div>

            <hr />
            <div className="form-group mb-2">
                <label>Titulo y notas</label>
                <input 
                    type="text" 
                    className={`form-control ${titleClass}`}
                    placeholder="Título del evento"
                    name="title"
                    autoComplete="off"
                    value={formValues.title}
                    onChange={onInputChange}
                />
                <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
            </div>

            <div className="form-group mb-2">
                <textarea 
                    type="text" 
                    className="form-control"
                    placeholder="Notas"
                    rows="5"
                    name="notes"
                    value={formValues.notes}
                    onChange={onInputChange}
                ></textarea>
                <small id="emailHelp" className="form-text text-muted">Información adicional</small>
            </div>

            <button
                type="submit"
                className="btn btn-primary btn-block"
            >
                <i className="far fa-save"></i>
                <span> Guardar</span>
            </button>

        </form>
    </Modal>
  )
}
