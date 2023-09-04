import { useSelector } from 'react-redux'

const Notification = ({ type }) => {
  const notification = useSelector((state) => state.notification)

  if (notification === '') {
    return null
  }

  return <div className={type}>{notification}</div>
}

export default Notification
