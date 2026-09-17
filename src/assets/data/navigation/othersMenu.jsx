import { FaHotel } from 'react-icons/fa';
import { MdOutlineEmojiTransportation, MdLogout } from 'react-icons/md';

const othersMenu = {
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
};

export default othersMenu;
