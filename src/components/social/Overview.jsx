function Overview({
  groupName = "Group",
  number = "1k+",
  children,
}) {

  return (
    <div className="overview">
      <div className="info">
        <h4>{groupName}</h4>
        <h6>{number}</h6>
      </div>

      <div className="icon">
        <span className="icon"> {children} </span>
      </div>
    </div>
  );
}

export default Overview;
