function School({year, details}){
  return(
    <div className="school-details">
      <h5>{year}</h5>
      <p>{details}</p>
    </div>
  )
}

export default School