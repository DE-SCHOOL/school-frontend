function StudentLesson({children,title, about }){
  return(
    <div className="student-lesson">
      <div className="lesson-icon">
        <span>{children}</span>
      </div>
      <div className="lesson-detail">
        <h3>{title}</h3>
        <h3>{about}</h3>
      </div>
    </div>
  )
}

export default StudentLesson