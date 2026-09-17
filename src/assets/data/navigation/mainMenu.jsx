import * as BootstrapIcon from 'react-icons/bs';
import { GiTeacher, GiUpgrade } from 'react-icons/gi';
import { SiCoursera } from 'react-icons/si';
import { FaSchool } from 'react-icons/fa';
import { FaY } from 'react-icons/fa6';
import { FcStatistics } from 'react-icons/fc';

const mainMenu = {
	menu: 'main',
	items: [
		{
			item: 'dashboard',
			visibleRight: ['lecturer', 'secreteriat', 'hod', 'director', 'admin'],
			icon: <BootstrapIcon.BsFillGridFill />,
			itemList: [
				{
					name: 'admin dashboard',
					link: 'admin',
					roles: ['admin'],
				},
				{
					name: 'teacher dashboard',
					link: 'teacher',
					roles: ['lecturer', 'secreteriat', 'hod', 'director', 'admin'],
				},
				{ name: 'student dashboard', link: 'student', roles: ['student'] },
				{
					name: 'assign course',
					link: 'course-assign',
					roles: ['hod', 'director', 'admin'],
				},
				{
					name: 'staff-courses',
					link: 'staff-course',
					roles: ['hod', 'director', 'admin'],
				},
				{
					name: 'my students',
					link: 'my-students',
					roles: ['lecturer', 'hod', 'director', 'admin'],
				},
			],
		},
		{
			item: 'students',
			visibleRight: ['lecturer', 'secreteriat', 'hod', 'director', 'admin'],
			icon: <BootstrapIcon.BsMortarboardFill />,
			itemList: [
				{
					name: 'student list',
					link: 'list',
					roles: ['secreteriat', 'hod', 'director', 'admin'],
				},
				{
					name: 'student view',
					link: 'view',
					roles: [
						'student',
						'lecturer',
						'secreteriat',
						'hod',
						'director',
						'admin',
					],
				},
				{
					name: 'student add',
					link: 'add',
					roles: ['secreteriat', 'hod', 'director', 'admin'],
				},
				{
					name: 'print list',
					link: 'print',
					roles: ['secreteriat', 'hod', 'director', 'admin'],
					target: true,
				},
			],
		},
		{
			item: 'teachers',
			visibleRight: ['lecturer', 'secreteriat', 'hod', 'director', 'admin'],
			icon: <GiTeacher />,
			itemList: [
				{
					name: 'teachers list',
					link: 'list',
					roles: ['lecturer', 'secreteriat', 'hod', 'director', 'admin'],
				},
				{
					name: 'teachers view',
					link: 'view',
					roles: ['lecturer', 'secreteriat', 'hod', 'director', 'admin'],
				},
				{
					name: 'teachers add',
					link: 'add',
					roles: ['director', 'admin'],
				},
				// {
				// 	name: 'teachers edit',
				// 	link: 'edit',
				// 	roles: ['director', 'admin'],
				// },
			],
		},
		{
			item: 'programs',
			visibleRight: ['lecturer', 'secreteriat', 'hod', 'director', 'admin'],
			icon: <FaSchool />,
			itemList: [
				{
					name: 'program list',
					link: 'list',
					roles: ['hod', 'director', 'admin', 'lecturer', 'secreteriat'],
				},
				{
					name: 'program view',
					link: 'view',
					roles: ['lecturer', 'secreteriat', 'hod', 'director', 'admin'],
				},
				{
					name: 'program add',
					link: 'add',
					roles: ['admin'],
				},
				// {
				// 	name: 'program edit',
				// 	link: 'edit',
				// 	roles: ['admin'],
				// },
			],
		},
		{
			item: 'departments',
			visibleRight: ['lecturer', 'secreteriat', 'hod', 'director', 'admin'],
			icon: <BootstrapIcon.BsBuildingsFill />,
			itemList: [
				{
					name: 'department list',
					link: 'list',
					roles: ['hod', 'director', 'admin', 'lecturer', 'secreteriat'],
				},
				{
					name: 'department view',
					link: 'view',
					roles: ['lecturer', 'secreteriat', 'hod', 'director', 'admin'],
				},
				{
					name: 'department add',
					link: 'add',
					roles: ['director', 'admin'],
				},
				// {
				// 	name: 'department edit',
				// 	link: 'edit',
				// 	roles: ['director', 'admin'],
				// },
			],
		},
		{
			item: 'specialties',
			visibleRight: ['lecturer', 'secreteriat', 'hod', 'director', 'admin'],
			icon: <BootstrapIcon.BsFillBuildingFill />,
			itemList: [
				{
					name: 'specialty list',
					link: 'list',
					roles: ['lecturer', 'secreteriat', 'hod', 'director', 'admin'],
				},
				{
					name: 'specialty view',
					link: 'view',
					roles: ['lecturer', 'secreteriat', 'hod', 'director', 'admin'],
				},
				{
					name: 'specialty add',
					link: 'add',
					roles: ['hod', 'director', 'admin'],
				},
				// {
				// 	name: 'specialty edit',
				// 	link: 'edit',
				// 	roles: ['hod', 'director', 'admin'],
				// },
			],
		},
		{
			item: 'courses',
			visibleRight: ['lecturer', 'secreteriat', 'hod', 'director', 'admin'],
			icon: <SiCoursera />,
			itemList: [
				{
					name: 'course list',
					link: 'list',
					roles: ['hod', 'director', 'admin'],
				},
				{
					name: 'course add',
					link: 'add',
					roles: ['hod', 'director', 'admin'],
				},
				// {
				// 	name: 'course edit',
				// 	link: 'edit',
				// 	roles: ['hod', 'director', 'admin'],
				// },
				{
					name: 'my courses',
					link: 'my-courses',
					roles: ['lecturer', 'secreteriat', 'hod', 'director', 'admin'],
				},
			],
		},
		{
			item: 'exam-center',
			visibleRight: ['director', 'admin'],
			icon: <BootstrapIcon.BsFillBookmarkStarFill />,
			itemList: [
				{
					name: 'marks list',
					link: 'list',
					roles: ['director', 'admin'],
				},
				{
					name: 'student results',
					link: 'student-results',
					roles: ['director', 'admin'],
				},
				{
					name: 'student resit',
					link: 'student-resit',
					roles: ['director', 'admin'],
				},
			],
		},
		{
			item: 'statistics',
			visibleRight: ['admin'],
			icon: <FcStatistics />,
			itemList: [
				{
					name: 'course stats',
					link: 'course-stats',
					roles: ['admin'],
				},
			],
		},
		{
			item: 'academic-year',
			visibleRight: ['admin'],
			icon: <FaY />,
			itemList: [
				{
					name: 'add year',
					link: 'add-year',
					roles: ['admin'],
				},
			],
		},
		{
			item: 'promotion',
			visibleRight: ['admin'],
			icon: <GiUpgrade />,
			itemList: [
				{
					name: 'promote students',
					link: 'promote-students',
					roles: ['admin'],
				},
			],
		},
	],
};

export default mainMenu;
