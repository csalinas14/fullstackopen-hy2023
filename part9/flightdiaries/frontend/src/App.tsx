import { useEffect, useState } from "react";
import Header from "./components/Header";
import Content from "./components/Content";
import DiaryForm from "./components/DiaryForm";
import { DiaryEntry } from "./types";
import { getAllDiaries } from "./services/diaryService";


const App = () => {

  const [diaries, setDiaries] = useState<DiaryEntry[]>([])

  useEffect(() => {
    getAllDiaries().then(data => setDiaries(data))
  }, [])

  return(
    <div>
      <DiaryForm diaries={diaries} setDiariesFunc={setDiaries}/>
      <Header name={'Diary Entries'}/>
      <Content diaries={diaries} />
    </div>
  )
}

export default App;