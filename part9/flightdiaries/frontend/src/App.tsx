import { useEffect, useState } from "react";
import Header from "./components/Header";
import Content from "./components/Content";
import axios from "axios";
import { ContentProps } from "./types";


const App = () => {

  const [diaries, setDiaries] = useState<ContentProps[]>([])

  useEffect(() => {
    axios.get<ContentProps[]>('http://localhost:3000/api/diaries').then(response => {
      //console.log(response.data);
      setDiaries(response.data);
    })
  }, [])

  return(
    <div>
      <Header name={'Diary Entries'}/>
      <Content diaries={diaries} />
    </div>
  )
}

export default App;