function TeachingHistory(){
  return(
    <table>
      <tbody>
      <tr className="table">
        <td className="timetable">
        <div >
          <h4>Digital Electronics</h4>
          <p>2.1 Lorem sit dolor</p>
          <ul>
            <li> <FaCalendar className="fa"/> Dec 3, 2023</li>
            <li>|</li>
            <li><FaClock className="fa"/> 09:30 - 11:30 am (2 hours)</li>
          </ul>
        </div>
        </td>

        <td>
          <div className="confirm">
            <button>Confirm</button>
          </div>
        </td>
      </ tr>
    </tbody>
  </table>
  )
}

export default TeachingHistory