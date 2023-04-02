// Write your code here
import {format} from 'date-fns'
import './index.css'

const normalStarUrl =
  'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
const starredStarUrl =
  'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'

const AppointmentItem = props => {
  const {
    AppointmentDetails,
    toggleStarImageAndAddToStarredlist,
    deleteAppointment,
  } = props
  const {title, date, isStarred, id} = AppointmentDetails
  const datestring = format(new Date(date), 'dd MMMM yyyy, EEEE')
  const starUrl = isStarred ? starredStarUrl : normalStarUrl
  const onselectDeselectStar = () => {
    toggleStarImageAndAddToStarredlist(id)
  }
  const onClickDelete = () => {
    deleteAppointment(id)
  }

  return (
    <li className="list-item-container">
      <div className="star-title-container">
        <p className="title-name">{title}</p>
        <button
          type="button"
          className="star-button"
          data-testid="star"
          onClick={onselectDeselectStar}
        >
          <img src={starUrl} alt="star" className="star-img" />
        </button>
      </div>
      <p className="date">Date:{datestring}</p>
      <button
        type="button"
        className="delete-btn"
        onClick={onClickDelete}
        data-testid="delete"
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
          className="delete-img"
          alt="delete"
        />
      </button>
    </li>
  )
}
export default AppointmentItem
