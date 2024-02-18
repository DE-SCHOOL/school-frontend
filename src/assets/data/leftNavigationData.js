import * as BootstrapIcon from 'react-icons/bs';
import { GiTeacher } from 'react-icons/gi';
import { SiCoursera, SiStatuspage } from 'react-icons/si';
import { RiMoneyDollarBoxFill } from 'react-icons/ri';
import {
	MdHolidayVillage,
	MdOutlineEmojiTransportation,
	MdLogout,
} from 'react-icons/md';
import { BiTable } from 'react-icons/bi';
import { IoLibrarySharp, IoSettings } from 'react-icons/io5';
import { FaBloggerB, FaHotel, FaSchool } from 'react-icons/fa';
// ['lecturer', 'secreteriat', 'hod', 'director', 'admin']
const data = [
	{
		menu: 'main',
		items: [
			{
				item: 'dashboard',
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
						name: 'staff courses',
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
				item: 'exam center',
				icon: <BootstrapIcon.BsFillBookmarkStarFill />,
				itemList: [
					{
						name: 'marks list',
						link: 'list',
						roles: ['director', 'admin'],
					},
					{
						name: 'student marks',
						link: 'student-marks',
						roles: ['director', 'admin'],
					},
				],
			},
			{
				item: 'statistics',
				icon: <SiStatuspage />,
				itemList: [
					{
						name: 'course stats',
						link: 'course-stats',
						roles: ['admin'],
					},
					// {
					// 	name: 'specialty stats',
					// 	link: 'specialty-stats',
					// 	roles: ['admin'],
					// },
				],
			},
		],
	},
	{
		menu: 'management',
		items: [
			{
				item: 'accounts',
				icon: <RiMoneyDollarBoxFill />,
				itemList: [
					{
						name: 'fees collection',
						link: 'fees-collection',
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
						name: 'expenses',
						link: 'expenses',
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
						name: 'salary',
						link: 'salary',
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
						name: 'add fees',
						link: 'add-fees',
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
						name: 'add expenses',
						link: 'add-expenses',
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
						name: 'add salary',
						link: 'add-salary',
						roles: [
							'student',
							'lecturer',
							'secreteriat',
							'hod',
							'director',
							'admin',
						],
					},
				],
			},
			{
				item: 'holiday',
				icon: <MdHolidayVillage />,
				link: 'holiday',
				itemList: [],
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
				item: 'exam list',
				link: 'exam-list',
				icon: <BootstrapIcon.BsFileTextFill />,
				itemList: [],
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
				item: 'events',
				link: 'events',
				icon: <BootstrapIcon.BsCalendar2EventFill />,
				itemList: [],
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
				item: 'time table',
				link: 'time-table',
				icon: <BiTable />,
				itemList: [],
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
				item: 'library',
				link: 'library',
				icon: <IoLibrarySharp />,
				itemList: [],
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
				item: 'blog',
				icon: <FaBloggerB />,
				itemList: [
					{
						name: 'view blog',
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
						name: 'add blog',
						link: 'add',
						roles: [
							'student',
							'lecturer',
							'secreteriat',
							'hod',
							'director',
							'admin',
						],
					},
				],
			},
			{
				item: 'settings',
				icon: <IoSettings />,
				link: 'settings',
				itemList: [],
				roles: [
					'student',
					'lecturer',
					'secreteriat',
					'hod',
					'director',
					'admin',
				],
			},
		],
	},
	{
		menu: 'others',
		items: [
			{
				item: 'hostel',
				link: 'hostel',
				icon: <FaHotel />,
				itemList: [],
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
				item: 'transport',
				link: 'transport',
				icon: <MdOutlineEmojiTransportation />,
				itemList: [],
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
				item: 'logout',
				link: '',
				icon: <MdLogout />,
				itemList: [],
				roles: [
					'student',
					'lecturer',
					'secreteriat',
					'hod',
					'director',
					'admin',
				],
			},
		],
	},
];

export default data;
