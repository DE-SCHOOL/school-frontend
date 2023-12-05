function StudentActivity({position, winner, time, picture}){
  return(
    <div className="student-activity">
      <div className="activity-awards">
        <img src={picture} alt="" />
        <div className="award-details">
          <h4>{position}</h4>
          <h5>{winner} won {position}</h5>
        </div>
      </div>
      <div className="award-time">
        <span>{time}</span>
      </div>
    </div>
  )

}

export default StudentActivity