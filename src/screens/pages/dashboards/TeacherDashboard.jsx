import { FaPerson } from "react-icons/fa6"
import { Layout, SectionIntro } from "../../../components/layout"
import Footer from "../../../components/layout/Footer"
import Overview from "../../../components/social/Overview"
import { FaBook, FaClock, FaGraduationCap} from "react-icons/fa"
import {TeacherCalendar, LessonsTable}from "../../../components/events/index"
import { BiLoader } from "react-icons/bi"
import Calendar from 'react-calendar'
import { useState } from "react"

function TeacherDashboard() {
	const [value, onChange] = useState(new Date());

	return (
		<Layout>
			<div className="dashboard-body">
				<SectionIntro 
				title="Welcome"
				main="Teacher"
				sub="Home"
				/>

				<div className="school-overview">
					<Overview
						groupName="Total Classes"
						number="04/06"
						children={<FaPerson className="overview-icon" />}
					/>
					<Overview
						groupName="Total Lessons"
						number="40/60"
						children={<FaBook className="overview-icon" />}
					/>
					<Overview
						groupName="Total Students"
						number="30/50"
						children={<FaGraduationCap className="overview-icon" />}
					/>
					<Overview
						groupName="Total Hours"
						number="15/20"
						children={<FaClock className="overview-icon" />}
					/>
				</div>

				<div className="semester">
					<div className="activity">
						<div className="lesson-progress">
							<div className="lessons">
								<h3>Up coming lessons</h3>
								<LessonsTable 
								lessonName="Digital Electronics" 
								date="Dec 03, 2023"
								time="7:30 - 8:30 am"
								classRoom="Classroom 301"
								children={<>
									<button>Confirm</button>
									<button>Reschedule</button>
									</>}
								/>
								<LessonsTable
									lessonName="Digital Electronics"
									date="Dec 03, 2023"
									time="7:30 - 8:30 am"
									classRoom="Classroom 201"
									children={
										<>
											<button>Confirm</button>
											<button>Reschedule</button>
										</>
									}
								/>
							</div>
							<div className="progress">
								<h5>Semester Progress</h5>
							</div>
						</div>

							<div className="statistics">
								<BiLoader />
							</div>
							<div className="history">
								<h3>Teaching history</h3>
								<LessonsTable
								lessonName="Maths Analysis"
								date="Oct 19, 2023"
								time="09:30 - 11:30 am"
								children={<button>Completed</button>}
							/>
							<LessonsTable
								lessonName="Project Management"
								date="Sept 06, 2023"
								time="07:30 - 19:30 am"
								children={<button>Completed</button>}
							/>
							<LessonsTable
								lessonName="SDLC"
								date="Sept 06, 2023"
								time="12:00 - 02:00 pm"
								children={<button>Completed</button>}
							/>
						</div>
					</div>
					<div className="side-bar card">
						<Calendar onChange={onChange} value={value} className="calendar" />
						<div className="cal-container">
							<h3>Upcoming Events</h3>
						<TeacherCalendar />
						<TeacherCalendar />
						<TeacherCalendar />
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</Layout>
	);
}

export default TeacherDashboard;
