interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartDescriptionBase extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartDescriptionBase {
  kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

interface CoursePartBackground extends CoursePartDescriptionBase {
  backgroundMaterial: string;
  kind: "background"
}

interface CoursePartSpecial extends CoursePartDescriptionBase {
  requirements: string[];
  kind: "special"
}

type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;


interface HeaderProps {
  name: string;
}

const Header = (props: HeaderProps) => {
  return <h1>{props.name}</h1>
}


const Content = ({parts}: {parts: CoursePart[]}) => {
  return(
    <div>
      {parts.map((part) =>
        <Part coursePart={part}/>
      )}
    </div>
  )
}


const Part = ({coursePart}: {coursePart: CoursePart}) => {

  const assertNever = (value: never): never => {
    throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`)
  };


  switch(coursePart.kind){
    case "basic":
      return <p>
        <b>{coursePart.name} {coursePart.exerciseCount} </b> <br />
        {coursePart.description}</p>
    case "group":
      return <p>
        <b>{coursePart.name} {coursePart.exerciseCount} </b> <br />
        {"project exercises " + coursePart.groupProjectCount} </p>
    case "background":
      return <p>
        <b>{coursePart.name} {coursePart.exerciseCount} </b> <br />
        <em>{coursePart.description}</em> <br />
        {"submit to " + coursePart.backgroundMaterial}</p>
    case "special":
      return <p>
        <b>{coursePart.name} {coursePart.exerciseCount}</b> <br />
        <em>{coursePart.description}</em> <br />
        required skills: {" "}
        {coursePart.requirements.map((r, i) => i < coursePart.requirements.length - 1 ? `${r}, ` : r)}
      </p>
    default:
      return assertNever(coursePart)
  }
}

interface TotalProps {
  totalExercises: number;
}

const Total = (props: TotalProps) => 
<p>
  Number of exercises {props.totalExercises}
</p>

const App = () => {
  const courseName = "Half Stack application development";
  
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group"
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
      kind: "background"
    },
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      description: "a hard part",
      kind: "basic",
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      kind: "special"
    }
  ];

  const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);

  return (
    <div>
      <Header name={courseName}/>
      <Content parts={courseParts}/>
      <Total totalExercises={totalExercises} />
    </div>
  );
};

export default App;