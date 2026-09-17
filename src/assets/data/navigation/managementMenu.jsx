import * as BootstrapIcon from 'react-icons/bs';
import { RiMoneyDollarBoxFill } from 'react-icons/ri';
import { MdHolidayVillage } from 'react-icons/md';
import { BiTable } from 'react-icons/bi';
import { IoLibrarySharp, IoSettings } from 'react-icons/io5';
import { FaBloggerB, FaPoll } from 'react-icons/fa';
import { FaHandsHoldingChild, FaMessage } from 'react-icons/fa6';

const managementMenu = {
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
			item: 'form-bs',
			link: 'form-bs',
			visibleRight: ['hod', 'director', 'admin', 'secreteriat'],
			icon: <BiTable />,
			itemList: [
				{
					name: "upload form-b's",
					link: 'upload-form-bs',
					roles: ['hod', 'director', 'admin'],
				},
				{
					name: "form-b's list",
					link: 'formb-list',
					roles: ['hod', 'director', 'admin', 'secreteriat'],
				},
			],
		},
		{
			item: 'human-resource',
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
};

export default managementMenu;
