import Overview from "../../../components/social/Overview";
import SocialMedia from "../../../components/social/SocialMedia";
import {
  FaAward, FaBuilding,
  FaFacebook, FaGraduationCap,
  FaInstagram, FaLinkedinIn,
  FaMoneyBill, FaTwitter
} from 'react-icons/fa'
import { Layout } from "../../../components/layout";
import Footer from "../../../components/layout/Footer";

const starStudents = [
  {
    id: "swe2019",
    name: "John Doe",
    marks: 1190,
    percentage: 98,
    year: 2019,
    picture: 'https://randomuser.me/api/portraits/thumb/women/53.jpg',
  },
  {
    id: "its218",
    name: "Jane Doe",
    marks: 1175,
    percentage: 94,
    year: 2018,
    picture: 'https://randomuser.me/api/portraits/thumb/men/48.jpg',
  },
  {
    id: "swe2017",
    name: "Eve Dallas",
    marks: 1196,
    percentage: 99,
    year: 2017,
    picture: 'https://randomuser.me/api/portraits/thumb/women/16.jpg',
  },
  {
    id: "gwd2016",
    name: "Just Roarke",
    marks: 1198,
    percentage: 99,
    year: 2016,
    picture: 'https://randomuser.me/api/portraits/thumb/men/10.jpg',
  },
  {
    id: "swe2015",
    name: "Delia Peabody",
    marks: 1189,
    percentage: 98,
    year: 2019,
    picture: 'https://randomuser.me/api/portraits/thumb/men/72.jpg',
  },
];

function AdminDashboard({ backgroundColor }) {

  return (
    <Layout>
      <div className="dashboard-body">
        <div className="page-header">
          <h1>Welcome Admin!</h1>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>/Admin</li>
          </ul>
        </div>
        <div className="school-overview">
          <Overview
            groupName="Students"
            number="500+"
            children={<FaGraduationCap className="overview-icon" />}
          />
          <Overview
            groupName="Awards"
            number="5+"
            children={<FaAward  className="overview-icon"/>}
          />

          <Overview
            groupName="Departments"
            number="10+"
            children={<FaBuilding className="overview-icon" />}
          />

          <Overview
            groupName="Revenue"
            number="1M+"
            children={<FaMoneyBill className="overview-icon" />}
          />
        </div>

        <div className="card">
          <div className="card_body">
            <div className="star_students">
              <h5>Star Students</h5>
            </div>
            <div className="table">
              <table>
                <thead>
                  <tr className="headings">
                    <th> ID </th>
                    <th> Name </th>
                    <th className="centered-text"> Marks </th>
                    <th className="centered-text"> Percentage </th>
                    <th className="centered-text"> Year </th>
                  </tr>
                </thead>
                <tbody>
                  {starStudents.map((student, index) => {
                    return (
                      <tr key={index} className="body">
                        <td> {student.id} </td>
                        <td className="flex">
                          <img src={student.picture} alt={student.name} />
                          <a href="/">{student.name}</a></td>
                        <td className="centered-text"> {student.marks} </td>
                        <td className="centered-text">
                          {student.percentage}%
                        </td>
                        <td> {student.year} </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="card_body">
            <div className="activity">
              <h5>Student Activity</h5>
            </div>
            <div className="student_activity">
              <div className="activity-body">
                <div className="activity-awards">
                  <img src="" alt="roarke" />
                  <div className="award-details">
                    <h4>1st Place in "Chess"</h4>
                    <h5>Jane Doe won 1st place in Chess</h5>
                  </div>
                  <div className="award-time">
                    <span>1 Day ago</span>
                  </div>
                </div>

                <div className="activity-awards">
                  <img src="" alt="eve" />
                  <div className="award-details">
                    <h4>!st place in L-Majesty</h4>
                    <h5>Roarke won L-Majesty for the week</h5>
                  </div>
                  <div className="award-time">
                    <span>5 days ago</span>
                  </div>
                </div>

                <div className="activity-awards">
                  <img src="" alt="jane" />
                  <div className="award-details">
                    <h4>Reading Competition</h4>
                    <h5>Delia Peabody participatd in reading competition</h5>
                  </div>
                  <div className="award-time">
                    <span>1 week ago</span>
                  </div>
                </div>

                <div className="activity-awards">
                  <img src="" alt="doe" />
                  <div className="award-details">
                    <h4>Motivation</h4>
                    <h5>John Doe motivated alot of students</h5>
                  </div>
                  <div className="award-time">
                    <span> 2 Weeks ago</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="social-media">
          <SocialMedia
            children={<FaTwitter className="media-icon" />}
            mediaName="Twitter"
            backgroundColor={"#1D9BF0"}
            border={"#1D9BF0"}
          />
          <SocialMedia
            children={<FaFacebook className="media-icon" />}
            mediaName="Facebook"
            backgroundColor={"#1877F2"}
            border={"#1877F2"}
          />
          <SocialMedia
            children={<FaLinkedinIn className="media-icon" />}
            mediaName="LinkedIn"
            backgroundColor={"#0A66C2"}
            border={"#0A66C2"}
          />
          <SocialMedia
            children={<FaInstagram className="media-icon" />}
            mediaName="Instagram"
            backgroundColor={"#FE643B"}
            border={"#FE643B"}
          />
        </div>
      </div>
      <Footer />
    </Layout>
  );
}

export default AdminDashboard;
