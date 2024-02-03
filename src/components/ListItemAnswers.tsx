/**
 * @author Prakhar Richhariya <prakhar.richhariya@314ecorp.com>
 * @description List item for answers of Chatbot
 */

import React from 'react';
import _ from 'lodash';
import { Avatar, Button, Dropdown, MenuProps, Typography } from 'antd';
import { DeleteOutlined, DownOutlined } from '@ant-design/icons';
import DOMPurify from 'dompurify';

import { useActions, useValues } from 'kea';
import { chatLogic } from '../store/chatLogic';

interface IProps {
	content: string;
	time: string;
	type: 'answer' | 'loading' | 'helpText';
}

const ListItemAnswers: React.FC<IProps> = (props) => {
	const { content, time } = props;
	const { currentUser, currentChats } = useValues(chatLogic);
	const { setCurrentChats, setCurrentUser, setReplying, setReplyingTo, setInputValue } = useActions(chatLogic);
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
	const items: MenuProps['items'] = [
		{
			key: '1',
			label: 'Reply',
			onClick: () => {
				setReplying(true);
				setReplyingTo(content);
				setInputValue(`Replying-To"${content}"-`);
			},
		},
	];

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'row',
				gap: '10px',
				justifyContent: 'flex-start',
				alignItems: 'flex-start',
				width: '300px',
			}}
		>
			<div>
				<Avatar src={currentUser.icon} />
			</div>

			<div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', gap: 4 }}>
				<Typography.Text
					style={{
						padding: 10,
						background: '#F1F4FB',
						borderRadius: '10px 10px 10px 0px',
						fontSize: 14,
						wordWrap: 'normal',
						whiteSpace: 'pre-wrap',
						wordBreak: 'break-word',
						color: '#424242',
					}}
					className='chatbot-answer-textbox'
				>
					<span dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }} />
				</Typography.Text>
				<Typography.Text style={{ color: 'gray', fontSize: 12 }}>{time}</Typography.Text>
				<Dropdown trigger={['click']} menu={{ items }}>
					<Button icon={<DownOutlined />} type='text' onClick={(e) => e.stopPropagation()} />
				</Dropdown>
			</div>
			<div>
				<DeleteOutlined onClick={() => handleDeleteClick(content)} />
			</div>
		</div>
	);
};

export default ListItemAnswers;
