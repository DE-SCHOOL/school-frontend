import React, { useEffect, useRef, useState } from 'react';
import { LayoutMainNav } from '../../../components/layout';
import { BiSearch, BiSend } from 'react-icons/bi';
import { lmuLogo } from '../../../assets/logos';
import { useDispatch, useSelector } from 'react-redux';
import {
	clearGroup,
	clearMessage,
	getAllGroupMessage,
	getAllGroups,
	getGroup,
	sendMessage,
} from '../../../store/messaging/messagingSlice';
import { getReadableTime } from './../../../utilities/getReadableTime';
import { useNavigate, useSearchParams } from 'react-router-dom';

function Messaging() {
	const scrollTo = useRef();
	const groups = useSelector((state) => state.groupChat.groups);
	const group = useSelector((state) => state.groupChat.group);
	const messages = useSelector((state) => state.groupChat.messages);
	const user = useSelector((state) => state.auth.user);
	const [messageText, setMessageText] = useState('');
	const [search, setSearch] = useState('');
	const [currentGroups, setCurrentGroups] = useState(groups);

	const dispatch = useDispatch();
	const [searchParam] = useSearchParams();
	const navigate = useNavigate();

	// const chatId = searchParam.get('chat');

	useEffect(() => {
		setTimeout(scrollTo.current?.scrollIntoView({ behavior: 'smooth' }), 500);
		dispatch(getAllGroups());
		dispatch(clearGroup());
	}, [dispatch]);

	useEffect(() => {
		const groupID = searchParam.get('chat');

		if (!groupID) return;

		dispatch(getGroup(groupID));
		dispatch(getAllGroupMessage(groupID));
		const unsubscribe = dispatch(getAllGroupMessage(groupID));

		return () => {
			unsubscribe();
			dispatch(clearMessage());
			dispatch(clearGroup());
		};
	}, [dispatch, searchParam]);

	const handleSendMessage = (e) => {
		e.preventDefault();
		if (messageText.trim() !== '') {
			const message = {
				senderId: user._id,
				groupId: searchParam.get('chat'),
				message: messageText,
				exactTime: new Date().toISOString(),
				media: null,
				senderName: user.name,
			};

			dispatch(sendMessage(message));
			setMessageText('');
		}
	};

	useEffect(() => {
		scrollTo.current?.scrollIntoView({ behavior: 'smooth' });
	}, [messages]);

	useEffect(() => {
		if (search.trim() !== '') {
			const curGroups = groups.filter((group) =>
				group.name.toLowerCase().includes(search)
			);

			setCurrentGroups(curGroups);
		} else {
			setCurrentGroups(groups);
		}
	}, [search, groups]);

	return (
		<LayoutMainNav>
			<div className="messaging">
				<div className="message-ui">
					<div className="group-names">
						<div className="form-search">
							<form className="search-bar" onSubmit={(e) => e.preventDefault()}>
								<BiSearch className="icon-search" />
								<input
									type="text"
									name="search"
									id="search"
									placeholder="Search contact"
									value={search}
									onChange={(e) => setSearch(e.target.value)}
								/>
							</form>
						</div>
						<div className="group-contacts">
							{currentGroups?.map((group) => (
								<div
									className="contact"
									onClick={() => navigate('?chat=' + group.id)}
									key={group.id}
								>
									{(group.image === null || !group?.image) && (
										<img src={lmuLogo} alt="LMU Logo" />
									)}
									{group.image !== null && group.image && (
										<img src={group.image} alt={group.description} />
									)}
									<div className="contact-info">
										<span className="group-name">{group.name}</span>
										<span className="last-message">{group.lastMessage}</span>
									</div>
									<span className="time">{getReadableTime(group.time)}</span>
								</div>
							))}
						</div>
					</div>
					{group !== null && (
						<div className="message-section">
							<div className="header-container">
								<div className="header">
									{group?.image !== null && group?.image ? (
										<img src={group.image} alt="Group Depiction" />
									) : (
										<img src={lmuLogo} alt="Group Depiction" />
									)}
									<div className="group-info">
										<span className="name">{group.name}</span>
										<span className="creator">
											{group?.createdBy} created this group.
										</span>
									</div>
								</div>
							</div>
							<div className="all-messages">
								{messages?.map((message, index) => {
									return (
										<div
											className={`message ${
												message.senderId === user._id && 'me'
											}`}
											key={message.id}
										>
											{message.senderId !== user._id && (
												<span className="name">{message.senderName}</span>
											)}
											<div className="message-content">{message.message}</div>
											<span className="time">
												{getReadableTime(message.timestamp)}
											</span>
										</div>
									);
								})}
								<div ref={scrollTo} />
							</div>
							<div className="message-form">
								<form action="" className="form" onSubmit={handleSendMessage}>
									<textarea
										type="text"
										id="message"
										rows={3}
										value={messageText}
										onChange={(e) => setMessageText(e.target.value)}
									></textarea>
									<button className="button-send">
										<BiSend />
									</button>
								</form>
							</div>
						</div>
					)}
				</div>
			</div>
		</LayoutMainNav>
	);
}

export default Messaging;
