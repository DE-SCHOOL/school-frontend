import * as BootstrapIcon from 'react-icons/bs';
import { GiTeacher, GiUpgrade } from 'react-icons/gi';
import { SiCoursera } from 'react-icons/si';
import { RiMoneyDollarBoxFill } from 'react-icons/ri';
import {
	MdHolidayVillage,
	MdOutlineEmojiTransportation,
	MdLogout,
} from 'react-icons/md';
import { BiTable } from 'react-icons/bi';
import { IoLibrarySharp, IoSettings } from 'react-icons/io5';
import { FaBloggerB, FaHotel, FaPoll, FaSchool } from 'react-icons/fa';
import { FaHandsHoldingChild, FaMessage, FaY } from 'react-icons/fa6';
import { FcStatistics } from 'react-icons/fc';

const data = [
	{
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
				item: 'exam center',
				visibleRight: ['director', 'admin'],
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
				item: 'academic year',
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
	},
	{
		menu: 'management',
		items: [
			{
				item: 'communication',
				visibleRight: ['admin', 'hod', 'director'],
				icon: <FaMessage />,
				itemList: [
					{
						name: 'add group',
						link: 'add-group',
						roles: ['admin', 'hod', 'director'],
					},
					{
						name: 'group list',
						link: 'group-list',
						roles: ['admin', 'hod', 'director'],
					},
					{
						name: 'messaging',
						link: 'group-messaging',
						roles: ['admin', 'hod', 'director'],
					},
				],
			},
			{
				item: 'time table',
				link: 'time-table',
				visibleRight: ['hod', 'director', 'admin', 'secreteriat'],
				icon: <BiTable />,
				itemList: [
					{
						name: 'upload timetable',
						link: 'upload-timetable',
						roles: ['hod', 'director', 'admin'],
					},
					{
						name: 'timetable list',
						link: 'timetable-list',
						roles: ['hod', 'director', 'admin', 'secreteriat'],
					},
				],
			},
			{
				item: "form bs",
				link: 'form-bs',
				visibleRight: ['hod', 'director', 'admin', 'secreteriat'],
				icon: <BiTable />,
				itemList: [
					{
						name: "upload form b's",
						link: 'upload-form-bs',
						roles: ['hod', 'director', 'admin'],
					},
					{
						name: "form b's list",
						link: 'formb-list',
						roles: ['hod', 'director', 'admin', 'secreteriat'],
					},
				],
			},
			{
				item: 'human resource',
				visibleRight: ['admin'],
				icon: <FaHandsHoldingChild />,
				itemList: [
					{
						name: 'review staff',
						link: 'review-staff',
						roles: ['admin'],
					},
				],
			},
			{
				item: 'poll',
				visibleRight: ['secreteriat', 'hod', 'director', 'admin'],
				icon: <FaPoll />,
				itemList: [
					{
						name: 'poll add',
						link: 'add',
						roles: ['secreteriat', 'hod', 'director', 'admin'],
					},
					{
						name: 'poll list',
						link: 'list',
						roles: ['secreteriat', 'hod', 'director', 'admin'],
					},
				],
			},
			{
				item: 'accounts',
				visibleRight: ['lecturer', 'secreteriat', 'hod', 'director', 'admin'],
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
				visibleRight: ['lecturer', 'secreteriat', 'hod', 'director', 'admin'],
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
				visibleRight: ['lecturer', 'secreteriat', 'hod', 'director', 'admin'],
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
				visibleRight: ['lecturer', 'secreteriat', 'hod', 'director', 'admin'],
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
				item: 'library',
				link: 'library',
				visibleRight: ['lecturer', 'secreteriat', 'hod', 'director', 'admin'],
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
				visibleRight: ['lecturer', 'secreteriat', 'hod', 'director', 'admin'],
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
				visibleRight: ['lecturer', 'secreteriat', 'hod', 'director', 'admin'],
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
				visibleRight: ['lecturer', 'secreteriat', 'hod', 'director', 'admin'],
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
				visibleRight: ['lecturer', 'secreteriat', 'hod', 'director', 'admin'],
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
				visibleRight: ['lecturer', 'secreteriat', 'hod', 'director', 'admin'],
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
