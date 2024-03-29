import { useSelector, useDispatch } from 'react-redux'
import { addOneVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleSubmit }) => {
    return(
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.likes}
            <button onClick={handleSubmit}>vote</button>
          </div>
        </div>
    )
}

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(({filter, anecdotes}) => anecdotes
    .filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase())))

  const addLike = ( event, anecdote ) => {
    event.preventDefault()
    dispatch(addOneVote(anecdote))

    dispatch(setNotification(`you liked ${anecdote.content}`, 10))
    /*
    setTimeout(() => {
      dispatch(resetNotification())
    }, 5000)
    */
  }

  return(
    <div>
      {anecdotes.map(anecdote =>
        <Anecdote 
          key={anecdote.id}
          anecdote={anecdote}
          handleSubmit={(e) => addLike(e, anecdote)}
        />
      )}
    </div>
  )
}

export default AnecdoteList