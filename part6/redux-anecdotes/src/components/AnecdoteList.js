import { useSelector, useDispatch } from 'react-redux'
import { addOneVote } from '../reducers/anecdoteReducer'
import { setNotification, resetNotification } from '../reducers/notificationReducer'

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

  const addLike = ( event, id, content ) => {
    event.preventDefault()
    dispatch(addOneVote(id))

    dispatch(setNotification(`you liked ${content}`))
    setTimeout(() => {
      dispatch(resetNotification())
    }, 5000)
  }

  return(
    <div>
      {anecdotes.map(anecdote =>
        <Anecdote 
          key={anecdote.id}
          anecdote={anecdote}
          handleSubmit={(e) => addLike(e, anecdote.id, anecdote.content)}
        />
      )}
    </div>
  )
}

export default AnecdoteList