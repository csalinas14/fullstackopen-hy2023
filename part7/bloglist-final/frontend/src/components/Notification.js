//import { useSelector } from 'react-redux'
import { useNotificationValue } from '../NotificationContext'

const Notification = ({ type }) => {
  //redux
  //const notification = useSelector((state) => state.notification)
  const notification = useNotificationValue()

  if (notification === '') {
    return null
  }

  return <div className={type}>{notification}</div>
}

export default Notification
