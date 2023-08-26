import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'
/*
const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    likes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)


const getId = () => (100000 * Math.random()).toFixed(0)
*/
const sortAncedotesByLikes = ancedotesArray => ancedotesArray.sort((a,b) => b.likes - a.likes)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    /*
    createAnecdote(state, action) {
      
      const content = action.payload
      const newAnecdote = {
        content,
        id: getId(),
        likes: 0
      }
      
      state.push(action.payload)
    },
    */
   /*
    addOneVote(state, action){
      //console.log(action.payload)
      const id = action.payload
      const anecdoteToChange = state.find(anecdote => anecdote.id === id)
      //console.log(anecdoteToChange)
      const changedAnecdote = {
        ...anecdoteToChange,
        likes: anecdoteToChange.likes + 1
      }
      return sortAncedotesByLikes(state.map(anecdote => anecdote.id !== id ? anecdote : changedAnecdote))
    },
    */
    appendAnecdote(state, action){
      state.push(action.payload)
    },
    setAnecdotes(state, action){
      return action.payload
    },
    updateLikesOfAnecdote(state, action){
      const changedAnecdote = action.payload
      //console.log(id )
      return sortAncedotesByLikes(state.map(anecdote => anecdote.id !== changedAnecdote.id ? anecdote : changedAnecdote))
    }
  }
})

export const { appendAnecdote, setAnecdotes, getAnecdote, updateLikesOfAnecdote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    const sortedAnecdotes = sortAncedotesByLikes(anecdotes)
    dispatch(setAnecdotes(sortedAnecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createAnecdote(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const addOneVote = ( anecdote ) => {
  return async dispatch => {
    const changedAnecdote = {
      ...anecdote,
      likes: anecdote.likes + 1
    }
    //console.log(anecdoteToChange)
    const anecdoteToChange = await anecdoteService.updateAnecodte(changedAnecdote)
    //console.log(anecdoteToChange)
    //console.log(id)
    dispatch(updateLikesOfAnecdote(anecdoteToChange))
  }
}

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