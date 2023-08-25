import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { resetNotification, setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        //console.log(content)
        event.target.anecdote.value = ''
        dispatch(createAnecdote(content))
        //dispatch({type: 'anecdotes/createAnecdote', payload: content})
        //both work above
        dispatch(setNotification(`you created ${content}`))
        setTimeout(() => {
          dispatch(resetNotification())
        }, 5000)
        
    }

    return(
        <div>
          <h2>create new</h2>
          <form onSubmit={addAnecdote}>
            <div><input name='anecdote' /></div>
            <button type='submit'>create</button>
          </form>
        </div>
    )
}

export default AnecdoteForm