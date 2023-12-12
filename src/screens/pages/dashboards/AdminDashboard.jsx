import Overview from "../../../components/social/Overview";
import SocialMedia from "../../../components/social/SocialMedia";
import {
  FaAward, FaBuilding,
  FaFacebook, FaGraduationCap,
  FaInstagram, FaLinkedinIn,
  FaMoneyBill, FaTwitter
} from 'react-icons/fa'
import { Layout, SectionIntro } from "../../../components/layout";
import Footer from "../../../components/layout/Footer";
import { profile1, profile12, profile4, profile8 } from "../../../assets/images";
import {StudentActivity, StarStudents} from '../../../components/events/index';

function AdminDashboard() {

  return (
    <Layout>
      <div className="dashboard-body">
        
        <SectionIntro
        title="Welcome"
        main="Admin"
        sub="Home"
        />

        <div className="school-overview">
          <Overview groupName="Students" number="500+" children={<FaGraduationCap className="overview-icon" />}
          />
          <Overview groupName="Awards" number="5+" children={<FaAward  className="overview-icon"/>}
          />

          <Overview groupName="Departments" number="10+" children={<FaBuilding className="overview-icon" />}
          />

          <Overview groupName="Revenue" number="1M+" children={<FaMoneyBill className="overview-icon" />}
          />
        </div>

        <div className="card">
          <div className="card_body">
            <h5 className="card-title">Star Students</h5>
            <StarStudents />
          </div>

          <div className="card_body">
            <h5 className="card-title">Student Activity</h5>
            <StudentActivity 
              picture={profile4}
              position="1st in L-Majesty"
              winner="Roarke"
              time="1 day ago"
            />
            <StudentActivity
              picture={profile1}
              position="Code Battle winner"
              winner="Callendar"
              time="5 days ago"
            />
            <StudentActivity 
             picture={profile8}
             position="Hackaton"
             winner="LSS"
             time="1 week ago"
            />
            <StudentActivity 
             picture={profile12}
             position="Footbal winner"
             winner="lMU Staffs"
             time="2 days ago"
            />
          </div>

        </div>
        <div className="social-media">
          <SocialMedia 
            children={<FaTwitter className="media-icon" />} 
            mediaName="Twitter"
            backgroundColor={"#1D9BF0"}
            border={"#1D9BF0"}
          />
          <SocialMedia children={<FaFacebook className="media-icon" />}
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
