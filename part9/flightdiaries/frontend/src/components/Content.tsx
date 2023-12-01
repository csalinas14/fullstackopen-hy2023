import { ContentProps } from "../types";

const Part = (props: ContentProps) => {
  return(
    <p>
      <b>{props.date} </b> <br />
      visibility: {props.visibility} <br />
      weather: {props.weather}
    </p>
  )
}

const Content = ({diaries}: { diaries: ContentProps[]}) => {
  return(
    <div>
      {diaries.map((diary) => <Part key={diary.id} {...diary}/> )}
    </div>
  )
}

export default Content;