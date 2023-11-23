
function SocialMedia({
  mediaName = "Social Platform",
  followers = "1k+",
  backgroundColor,
  border,
  children
}) {
  const styles = {
    backgroundColor,
    border
  };

  return (
    <div className="social" style={styles}>
      <div className="info">
        <h4>Find us on {mediaName}</h4>
        <h6>{followers}</h6>
      </div>

      <div className="media">
        <span style={styles}> {children} </span>
      </div>
    </div>
  );
}

export default SocialMedia