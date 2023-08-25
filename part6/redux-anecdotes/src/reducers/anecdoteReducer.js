import { createSlice } from '@reduxjs/toolkit'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const sortAncedotesByLikes = ancedotesArray => ancedotesArray.sort((a,b) => b.likes - a.likes)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    likes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    createAnecdote(state, action) {
      const content = action.payload
      const newAnecdote = {
        content,
        id: getId(),
        likes: 0
      }
      state.push(newAnecdote)
    },
    addOneVote(state, action){
      console.log(action.payload)
      const id = action.payload
      const anecdoteToChange = state.find(anecdote => anecdote.id === id)
      console.log(anecdoteToChange)
      const changedAnecdote = {
        ...anecdoteToChange,
        likes: anecdoteToChange.likes + 1
      }
      return sortAncedotesByLikes(state.map(anecdote => anecdote.id !== id ? anecdote : changedAnecdote))
    }
  }
})

export const { createAnecdote, addOneVote } = anecdoteSlice.actions
export default anecdoteSlice.reducer
/*
const anecdoteReducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)
  
  switch(action.type){
    case 'VOTE':
      const id = action.payload.id
      const anecdoteToChange = state.find(anecdote => anecdote.id === id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
      return sortAncedotesByLikes(state.map(anecdote => anecdote.id !== id ? anecdote : changedAnecdote))
    case 'NEW_ANECDOTE':
      return [...state, action.payload]
    default: return state
  }
}

export const addOneVote = (id) => {
  return {
    type: 'VOTE',
    payload: { id }
  }
}

export const createAncedote = (content) => {
  return {
    type: 'NEW_ANECDOTE',
    payload: {
      content,
      id: getId(),
      votes: 0
    }
  }
}

export default anecdoteReducer

*/