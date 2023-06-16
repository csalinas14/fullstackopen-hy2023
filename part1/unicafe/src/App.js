import { useState } from 'react'

const Header = (props) => {
  return (
      <h1>{props.title}</h1>
  )
}

const Button = (props) => {
  return(
    <button onClick={props.handleClick}>
      {props.name}
    </button>
  )
}

const Statistics = (props) => {
  const values = props.values

  if(values[3].value === 0){
    return(
      <div>
        <h1>{props.name}</h1>
         No feedback given
      </div>
    )
  }

  return(
    <div>
      <h1>{props.name}</h1>
      <table>
        <tbody>
          <StatisticLine name={values[0].name} value={values[0].value}/>
          <StatisticLine name={values[1].name} value={values[1].value}/>
          <StatisticLine name={values[2].name} value={values[2].value}/>
          <StatisticLine name={values[3].name} value={values[3].value}/>
          <StatisticLine name={values[4].name} value={values[4].value}/>
          <StatisticLine name={values[5].name} value={values[5].value}/>
        </tbody>
      </table>
    </div>
  )
}

const StatisticLine = (props) => {
  return(
    <tr>
      <td>{props.name} </td>
      <td>{props.value}</td>
    </tr>
  )
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const all = good + neutral + bad
  const average = (good*1 + neutral * 0 + bad * -1)/all
  const positive = good*100/all + " %"

  const stats = {
    name: "statistics",
    parts: [
      {
        name: "good",
        value: good
      },
      {
        name: "neutral",
        value: neutral
      },
      {
        name: "bad",
        value: bad
      },
      {
        name: "all",
        value: all
      },
      {
        name: "average",
        value: average
      },
      {
        name: "positive",
        value: positive
      }
    ]
  }

  return (
    <div>
      <Header title='give feedback'/>
      <Button handleClick={() => setGood(good+1)} name="good"/>
      <Button handleClick={() => setNeutral(neutral+1)} name="neutral"/>
      <Button handleClick={() => setBad(bad+1)} name="bad"/>
      <Statistics name={stats.name} values={stats.parts}/>
    </div>
  )
}

export default App