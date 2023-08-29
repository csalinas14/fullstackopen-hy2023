import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { createAnecdote } from "../services/requests"
import { useNotificationDispatch } from '../NotificationContext'

const AnecdoteForm = () => {
  const notificationDispatch = useNotificationDispatch()
  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation( {
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData({ queryKey: ['anecdotes']})
      queryClient.setQueryData({queryKey: ['anecdotes']}, anecdotes.concat(newAnecdote))
      notificationDispatch({type: 'SHOW', payload: `anecdote '${newAnecdote.content}' created`})
      setTimeout(() => {
        notificationDispatch({type: 'HIDE'})
      },5000)
    },
    onError: (error) => {
      console.log(error.message)
      notificationDispatch({type: 'SHOW', payload: error.message})
      setTimeout(() => {
        notificationDispatch({type: 'HIDE'})
      },5000)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log('new anecdote')
    newAnecdoteMutation.mutate({ content, votes: 0})
    
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
