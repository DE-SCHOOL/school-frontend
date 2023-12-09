function PersonalDetails({children, name, value}){
  return(
    <div className="personal-details">
      <span className="details-icon">{children}</span>
      <div>
      <h4>{name}</h4>
      <h5>{value}</h5>
      </div>
    </div>
  )
}

export default PersonalDetails