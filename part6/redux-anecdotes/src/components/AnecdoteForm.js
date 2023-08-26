import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
//import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        //console.log(content)
        event.target.anecdote.value = ''
        dispatch(createAnecdote(content))
        //const newAnecdote = await anecdoteService.createAnecdote(content)
        //dispatch(createAnecdote(newAnecdote))
        //dispatch({type: 'anecdotes/createAnecdote', payload: content})
        //both work above
        dispatch(setNotification(`you created ${content}`, 10))    
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