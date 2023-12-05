import { FaCalendar, FaClock } from "react-icons/fa6";

function LessonsTable({ lessonName, date, classRoom, time, children}){
  return(
    <table>
      <tbody>
      <tr className="table">
        <td className="timetable">
        <div >
          <h4>{lessonName}</h4>
          {
            classRoom && <p>{classRoom}</p>
          }
          <ul>
            <li> <FaCalendar className="fa"/> {date}</li>
            <li>|</li>
            <li><FaClock className="fa"/> {time}</li>
          </ul>
        </div>
        </td>

        <td>
          <div className="confirm">
            {children}
            {/* <button>Confirm</button>
            <button>Reschedule</button> */}
          </div>
        </td>
      </ tr>
    </tbody>
  </table>
  )
}

export default LessonsTable