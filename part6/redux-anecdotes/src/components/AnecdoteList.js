import { useSelector, useDispatch } from 'react-redux'
import { addOneVote } from '../reducers/anecdoteReducer'

const Anecdote = ({ anecdote, handleSubmit }) => {
    return(
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleSubmit()}>vote</button>
          </div>
        </div>
    )
}

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(({filter, anecdotes}) => anecdotes
    .filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase())))

  return(
    <div>
      {anecdotes.map(anecdote =>
        <Anecdote 
          key={anecdote.id}
          anecdote={anecdote}
          handleSubmit={() => dispatch(addOneVote(anecdote.id))}
        />
      )}
    </div>
  )
}

export default AnecdoteList