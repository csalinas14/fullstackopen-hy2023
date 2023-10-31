const calcuculateBmi = (height: number, weight: number): string => {
  const bmi = weight / ((height / 100) * (height / 100))
  //console.log(bmi)
  switch (true) {
    case bmi < 16:
      return 'Underweight (Severe thinness)'
    case bmi <= 16.9:
      return 'Underweight (Moderate thinness)'
    case bmi <= 18.4:
      return 'Underweight (Mild thinness)'
    case bmi <= 24.9:
      return 'Normal (healthy weight)'
    case bmi <= 29.9:
      return 'Overweight'
    case bmi > 29.9:
      return 'Obese'
    default:
      return 'unknown'
  }
}

interface bmiValues {
  height: number
  weight: number
}

const parseArguments = (args: string[]): bmiValues => {
  if (args.length != 4)
    throw new Error('Not the correct amount of arguments. Return two numbers!')

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      weight: Number(args[2]),
      height: Number(args[3]),
    }
  } else {
    throw new Error('Provided values were not numbers')
  }
}

//const a: number = Number(process.argv[2])
//const b: number = Number(process.argv[3])

try {
  const { weight, height } = parseArguments(process.argv)
  //console.log(height)
  console.log(calcuculateBmi(weight, height))
} catch (error: unknown) {
  let errorMessage = 'Something bad happened '
  if (error instanceof Error) {
    errorMessage += 'Error: ' + error.message
  }
  console.log(errorMessage)
}
