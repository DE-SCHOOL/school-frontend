import { FaComputer, FaBook, FaClipboard, FaTrophy, FaBookOpen } from "react-icons/fa6";
import { Layout } from "../../../components/layout";
import Overview from "../../../components/social/Overview";
import TeacherCalendar from "../../../components/events/TeacherCalendar";
import LessonsTable from "../../../components/events/LessonsTable";
import Calendar from "react-calendar";
import {SectionIntro} from "../../../components/layout";
import { useState } from "react";
import Footer from "../../../components/layout/Footer";
import { BiLoader } from "react-icons/bi";
import StudentLesson from "../../../components/events/StudentLessons";

function StudentDashboard(){
  const [value, onChange] = useState(new Date());
  return(
    <Layout>
      <div className="dashboard-body">
      <SectionIntro 
				title="Welcome"
				main="Student"
				sub="Home"
				/>

				<div className="school-overview">
					<Overview
						groupName="All Courses"
						number="04/06"
						children={<FaComputer className="overview-icon"/>}
					/>
					<Overview
						groupName="All Projects"
						number="40/60"
						children={<FaBook className="overview-icon"/>}
					/>
					<Overview
						groupName="Tests Attended"
						number="30/50"
						children={<FaClipboard className="overview-icon"/>}
					/>
					<Overview
						groupName="Tests Passed"
						number="15/20"
						children={<FaTrophy className="overview-icon"/>}
					/>
				</div>

        <div className="semester">
          <div className="activity">
            <div className="student_timetable">
             {/*  <div className="title">
                <h3>Today's Lesson</h3>
              </div> */}
              <div className="time">
                  <div className="stats">
                    <p>To be added ...</p>
                  </div>
                  <div className="lesson">
                  <StudentLesson 
                    children={<FaClipboard />}
                    title="Assignment"
                    about="5 Assignment"
                  />
                  <StudentLesson
                    children={<FaBookOpen />}
                    title="Class"
                    about="English Language"
                  />
                  <StudentLesson
                    children={<FaBookOpen />}
                    title="Class"
                    about="English Language"
                  />
                  </div>
                  <div className="lesson">
                  <StudentLesson 
                    children={<FaClipboard />}
                    title="Assignment"
                    about="5 Assignment"
                  />
                  <StudentLesson
                    children={<FaBookOpen />}
                    title="Class"
                    about="English Language"
                  />
                  <StudentLesson
                    children={<FaBookOpen />}
                    title="Class"
                    about="English Language"
                  />
                  </div>
                  <div className="lesson">
                  <StudentLesson 
                    children={<FaClipboard />}
                    title="Assignment"
                    about="5 Assignment"
                  />
                  <StudentLesson
                    children={<FaBookOpen />}
                    title="Class"
                    about="English Language"
                  />
                  <StudentLesson
                    children={<FaBookOpen />}
                    title="Class"
                    about="English Language"
                  />
                  </div>
              </div>
            </div>
            <div className="statistics">
              <BiLoader />
            </div>
              <div className="history">
                <h3>Lesson History</h3>
                <LessonsTable
                lessonName="Maths Analysis"
                date="Oct 19, 2023"
                time="09:30 - 11:30 am"
                children={<button>Completed</button> }
                />
                <LessonsTable 
                lessonName="Project Management"
                date="Sept 06, 2023"
                time="07:30 - 19:30 am"
                children={<button>Completed</button> }
                />
                <LessonsTable 
                lessonName="SDLC"
                date="Sept 06, 2023"
                time="12:00 - 02:00 pm"
                children={<button>Completed</button> }
                />
              </div>
            </div>
            <div className="side-bar">
              <Calendar onChange={onChange} value={value} className="calendar"/>
              <TeacherCalendar />
              <TeacherCalendar />
              <TeacherCalendar />
            </div>
            </div>
        </div>
        <Footer />
    </Layout>
  )
}

export default StudentDashboard;
