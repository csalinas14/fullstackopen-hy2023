import { useState } from 'react'

const Button = (props) => {
  return(
    <button onClick={props.handleClick}>
      {props.name}
    </button>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const setRandom = () => {
    let random = Math.floor(Math.random() * anecdotes.length)
    console.log(random)
    setSelected(random)
  }

  const setVote = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)

    if (copy[selected] > mostVotes[1]){
      const copyVotes = [...mostVotes]
      copyVotes[0] = selected
      copyVotes[1] = copy[selected]
      setMostVotes(copyVotes)
    }

  }
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array(8).fill(0))
  const [mostVotes, setMostVotes] = useState([0,0])

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <br />
      has {points[selected]} votes
      <br />
      <Button handleClick={setVote} name="vote"/>
      <Button handleClick={setRandom} name="next anecdote"/>
      <br />
      <h1>Anecdote with most votes</h1>
      {anecdotes[mostVotes[0]]}
      <br />
      has {mostVotes[1]} votes

    </div>
  )
}

export default App