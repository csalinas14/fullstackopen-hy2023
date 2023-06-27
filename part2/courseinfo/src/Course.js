const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ sum }) => <b>total of {sum} exercises</b>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = (props) =>{ 
  console.log(props)
  const { parts } = props
  return(
  <>
    {parts.map(part => <Part key={part.id} part={part} />
    )}   
  </>
  )
}
const CourseInfo = (props) =>
{
  console.log(props)
  const { course } = props
  return(
  <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total sum={course.parts.reduce((sum, part) => sum + part.exercises, 0)} />
  </div>
  )
}

const Course = (props) =>{
    console.log(props)
    const {courses} = props
    return(
      <>
      {courses.map(course => <CourseInfo key={course.id} course={course}/>
      )}
      </>
    )
  }


export default Course