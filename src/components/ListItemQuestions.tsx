/**
 * @author Prakhar Richhariya <prakhar.richhariya@314ecorp.com>
 * @description List Item Question for Chatbot
 */

import React from 'react';
import _ from 'lodash';
import { Typography } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useActions, useValues } from 'kea';

import { chatLogic } from '../store/chatLogic';

interface IProps {
	content: string;
	time: string;
}

const ListItemQuestions: React.FC<IProps> = (props) => {
	const { content, time } = props;
	const { currentUser, currentChats } = useValues(chatLogic);
	const { setCurrentChats, setCurrentUser } = useActions(chatLogic);
	const handleDeleteClick = (content: string) => {
		const newMessageList = _.filter(currentUser.messageList, (message) => message.content !== content);
		setCurrentUser({ ...currentUser, messageList: newMessageList });
		let newChats = currentChats.map((chat: any) => {
			if (chat.userId === currentUser.userId) {
				chat.messageList = newMessageList;
			}
			return chat;
		});
		setCurrentChats(newChats);
	};
	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'flex-end',
				gap: 4,
				alignItems: 'flex-end',
				width: '250px',
			}}
		>
			<Typography.Text
				style={{
					padding: 10,
					background: '#2E4952',
					borderRadius: '10px 10px 0px 10px',
					fontSize: 14,
					wordWrap: 'normal',
					wordBreak: 'break-word',
					color: '#FFFFFF',
				}}
			>
				{content}
			</Typography.Text>
			<Typography.Text style={{ color: 'gray', fontSize: 12 }}>{time}</Typography.Text>
			<div>
				<DeleteOutlined onClick={() => handleDeleteClick(content)} />
			</div>
		</div>
	);
};

export default ListItemQuestions;
