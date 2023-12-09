import React from 'react'
import { Footer, Layout, SectionIntro } from '../../../components/layout'
import {School, PersonalDetails} from '../../../components/events'
import { TeacherInfo } from '../../../components/events'
import { avatar, profilebg } from '../../../assets/images'
import { FaLanguage, FaMapLocation, FaPerson, FaPhone } from 'react-icons/fa6'
import { FaBookOpen, FaCalendar, FaMailBulk } from 'react-icons/fa'


function TeacherView() {
  return (
    <Layout>
      <div className='dashboard-body'>
        <SectionIntro 
          title="Teacher Details"
          main="Teacher"
          sub="Teacher Details"
        />
        <div className="view-body">
          <div className="profile-head">
            <h1>Profile</h1>
          </div>
        <div className="profile_bg">
          <div className="bg-pic">
            <img src={profilebg} alt="Profile" />
          </div>
          <div className="profile-info">
            <div className='teacher-info'>
            <div className="pic">
            <img src={avatar} alt="Teacher" />
            </div>
            <div className="teacher-details">
              <h2>John Doe</h2>
              <h3>Engineering</h3>
            </div>
            </div>
            <div className="followers">
              <TeacherInfo 
                title="Followers"
                value="100"
              />
              <TeacherInfo 
                title="Posts"
                value="2"
              />
              <TeacherInfo 
                title="Likes"
                value="120"
              />
            </div>
            <div className="profile-action">
              <button>Follow</button>
              <button>Message</button>
            </div>

          </div>
        </div>

        <div className="profile-information">
          <div className="details-skills">
            <div className="details">
              <h1>Personal Details</h1>
              <PersonalDetails 
                children={<FaPerson />}
                name="Name"
                value="John Doe"
              />
              <PersonalDetails 
                children={<FaBookOpen />}
                name="Department"
                value="Software Engineering"
              />
              <PersonalDetails 
                children={<FaPhone/>}
                name="Mobile"
                value="+237612345678"
              />
              <PersonalDetails 
                children={<FaMailBulk />}
                name="Email"
                value="john.doe@gmail.com"
              />
              <PersonalDetails 
                children={<FaPerson />}
                name="Gender"
                value="Male"
              />
              <PersonalDetails 
                children={<FaCalendar />}
                name="Date of birth"
                value="19 Oct 1999"
              />
              <PersonalDetails 
                children={<FaMapLocation />}
                name="Address"
                value="Molyko Buea, Cameroon"
              />
              <PersonalDetails 
                children={<FaLanguage/>}
                name="Language"
                value="English, French"
              />
            </div>
            <div className="skills">
                <h1>Skills</h1>
                <p>Photoshop</p>
                <p>React</p>
                <p>Sass</p>
            </div>
          </div>

          <div className="about-me">
            <h1>About Me</h1>
            <h2>Hello I'm John Doe</h2>

            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, ad perferendis ipsum placeat culpa magnam ex doloremque fuga excepturi enim, obcaecati delectus harum iusto veniam dicta officia debitis eveniet cum distinctio. Consequuntur obcaecati nobis a optio, temporibus itaque in expedita autem, molestias voluptatum consequatur soluta vel. Earum cupiditate in nesciunt.</p>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Exercitationem perferendis sunt error libero quam odio voluptatum quas corporis reprehenderit odit?</p>

            <div className="education">
              <h1>Education</h1>
              <School
                year="2019" 
                details="Odinary Level at this School"
              />
              <School
                year="2021" 
                details="Advance Level at this School"
              />
              <School
                year="2024" 
                details="BTech at this School"
              />
              <School
                year="2026" 
                details="Masters at this School"
              />
            </div>

          </div>
        </div>
      </div>
    </div>
    <Footer />
    </Layout>
  )
}

export default TeacherView