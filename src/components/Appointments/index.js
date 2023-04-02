// Write your code here
import {Component} from 'react'
import {v4} from 'uuid'
import AppointmentItem from '../AppointmentItem'
import './index.css'

let l = JSON.parse(localStorage.getItem('normalAppointments'))
if (l === null) {
  l = []
}
class Appointments extends Component {
  state = {
    title: '',
    date: '',
    normalAppointments: l,
    starredAppointments: [],
    isStarredBtnSelected: false,
  }

  onChangeTitle = e => {
    this.setState({title: e.target.value})
  }

  onshangeDate = e => {
    this.setState({date: e.target.value})
  }

  onAddAppointment = e => {
    e.preventDefault()
    let {title, date} = this.state
    title = title.trim()
    date = date.trim()
    if (title !== '' && date !== '') {
      const newAppointment = {
        id: v4(),
        title,
        date,
        isStarred: false,
      }
      this.setState(prevState => ({
        normalAppointments: [...prevState.normalAppointments, newAppointment],
        title: '',
        date: '',
      }))
    }
  }

  onSelectDeselctStarredBtnAndGetStarredList = () => {
    this.setState(prevState => ({
      isStarredBtnSelected: !prevState.isStarredBtnSelected,
      starredAppointments: prevState.normalAppointments.filter(
        each => each.isStarred === true,
      ),
    }))
  }

  getlist = () => {
    const {
      normalAppointments,
      starredAppointments,
      isStarredBtnSelected,
    } = this.state
    localStorage.setItem(
      'normalAppointments',
      JSON.stringify(normalAppointments),
    )
    const list = isStarredBtnSelected ? starredAppointments : normalAppointments

    return list
  }

  toggleStarImageAndAddToStarredlist = id => {
    const {normalAppointments} = this.state
    const newnormalAppointments = normalAppointments.map(eachAppointment => {
      if (eachAppointment.id === id) {
        return {
          ...eachAppointment,
          isStarred: !eachAppointment.isStarred,
        }
      }
      return eachAppointment
    })
    const starredAppointments = newnormalAppointments.filter(
      each => each.isStarred === true,
    )

    this.setState({
      normalAppointments: newnormalAppointments,
      starredAppointments,
    })
  }

  deleteAppointment = id => {
    let {normalAppointments, starredAppointments} = this.state
    normalAppointments = normalAppointments.filter(each => each.id !== id)
    starredAppointments = starredAppointments.filter(each => each.id !== id)
    this.setState({
      normalAppointments,
      starredAppointments,
    })
  }

  render() {
    const {title, date, isStarredBtnSelected} = this.state

    const starredBtnClassName = isStarredBtnSelected
      ? 'starred-button active-starred-btn'
      : 'starred-button inactive-starred-btn'
    const AppointmentsList = this.getlist()

    return (
      <div className="app-bg-container">
        <div className="card-container">
          <div className="body">
            <div className="inputs-container">
              <form onSubmit={this.onAddAppointment}>
                <h1 className="main-heading">Add Appointment</h1>
                <div>
                  <label htmlFor="title">TITLE</label>
                  <br />
                  <input
                    type="text"
                    id="title"
                    placeholder="Title"
                    className="title-input"
                    value={title}
                    onChange={this.onChangeTitle}
                  />
                </div>
                <div>
                  <label htmlFor="date">DATE</label>
                  <br />
                  <input
                    type="date"
                    id="date"
                    className="date-input"
                    value={date}
                    onChange={this.onshangeDate}
                  />
                </div>
                <button type="submit" className="add-btn">
                  Add
                </button>
              </form>
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
                className="appointments-img"
              />
            </div>
            <div className="Appointments-container">
              <div className="heading-container">
                <h1 className="main-heading-2">Appointments</h1>
                <button
                  type="button"
                  className={starredBtnClassName}
                  onClick={this.onSelectDeselctStarredBtnAndGetStarredList}
                >
                  Starred
                </button>
              </div>
              <ul className="appointments-lists-container">
                {AppointmentsList.map(each => (
                  <AppointmentItem
                    AppointmentDetails={each}
                    toggleStarImageAndAddToStarredlist={
                      this.toggleStarImageAndAddToStarredlist
                    }
                    deleteAppointment={this.deleteAppointment}
                    key={each.id}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default Appointments
