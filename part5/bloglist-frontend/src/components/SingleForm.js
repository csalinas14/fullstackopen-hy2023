const SingleForm = ({name, value, handleChange}) => {

  //console.log(name)
  return(
    <div>
      <b>{name + ' '}</b>
      <input
        type="text"
        value={value}
        name={name}
        onChange={handleChange}
      />
    </div>
  )
}

export default SingleForm