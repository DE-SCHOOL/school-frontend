function PageHeader({person, userType}){
  return(
    <div className="page-header">
      <h1>Welcome {person}</h1>
      <ul>
        <li>{userType}</li>
        <li>Home</li>
      </ul>
    </div>
  )
}

export default PageHeader