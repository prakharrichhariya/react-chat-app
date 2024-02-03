/**
 * @author Prakhar Richhariya <prakhar.richhariya@314ecorp.com>
 * @description Message Screen Component
 */

import React, { useEffect, useRef } from 'react';
import _ from 'lodash';
import moment from 'moment';
import { Avatar, Button, Dropdown, Input, InputRef, List, MenuProps, Modal, Typography } from 'antd';
import { UpCircleOutlined, WhatsAppOutlined, DownOutlined } from '@ant-design/icons';
import { useValues, useActions } from 'kea';

import ListItemAnswers from './ListItemAnswers';
import ListItemQuestions from './ListItemQuestions';
import { chatLogic } from '../store/chatLogic';

const MessageScreen: React.FC = () => {
	const { currentUser, currentChats } = useValues(chatLogic);
	const { setCurrentUser, setCurrentChats } = useActions(chatLogic);
	const messageInputRef = useRef<InputRef>(null);
	const [inputValue, setInputValue] = React.useState('');

	useEffect(() => {
		if (messageInputRef.current) {
			messageInputRef.current.focus();
		}
	}, [currentUser]);

	const getListItem = (item: any) => {
		switch (item.type) {
			case 'answer':
			case 'loading':
				return (
					<List.Item>
						<ListItemAnswers type={item.type} content={item.content as string} time={item.time} />
					</List.Item>
				);

			case 'question':
				return (
					<List.Item style={{ display: 'flex', justifyContent: 'flex-end' }}>
						<ListItemQuestions content={item.content as string} time={item.time} />
					</List.Item>
				);

			default:
				return <List.Item>{item.content}</List.Item>;
		}
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);
	};

	const handleInputSend = (inputQuestion: string) => {
		if (inputQuestion) {
			const newQuestion = {
				type: 'question',
				content: inputQuestion,
				time: moment().format('hh:mm A'),
			};
			let newList = [...currentUser.messageList, newQuestion];
			setCurrentUser({ ...currentUser, messageList: newList });
			let newChats = currentChats.map((chat: any) => {
				if (chat.userId === currentUser.userId) {
					chat.messageList = newList;
				}
				return chat;
			});
			setCurrentChats(newChats);
		}
		setTimeout(() => {
			const listElement = document.getElementById('message-list');
			if (listElement) {
				const lastMessage = listElement.lastChild as HTMLElement;
				if (lastMessage) {
					lastMessage.scrollIntoView({ behavior: 'smooth', block: 'end' });
				}
			}
		}, 1);
		setInputValue('');
	};

	const items: MenuProps['items'] = [
		{
			key: '1',
			label: 'Delete Chat',
			onClick: () => {
				Modal.confirm({
					title: 'Are you sure you want to delete this chat?',
					onOk: () => {
						const newChats = currentChats.filter((chat: any) => chat.userId !== currentUser.userId);
						setCurrentChats(newChats);
						setCurrentUser({});
					},
				});
			},
		},
	];

	return !_.isEmpty(currentUser) ? (
		<div style={{ height: '100%', display: 'flex', flexDirection: 'column' }} className='message-screen-chat'>
			<div
				style={{
					borderBottom: '1px solid #424242',
					display: 'flex',
					flexDirection: 'row',
					alignItems: 'center',
					padding: '15px',
					justifyContent: 'space-between',
				}}
			>
				<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 15 }}>
					<Avatar size={'large'} src={currentUser.icon} />
					<div style={{ fontSize: 20, fontWeight: 'bold' }}>{currentUser.name}</div>
				</div>
				<div>
					<Dropdown trigger={['click']} menu={{ items }}>
						<Button icon={<DownOutlined />} type='text' />
					</Dropdown>
				</div>
			</div>
			<List
				id='message-list'
				dataSource={currentUser.messageList}
				split={false}
				style={{
					height: '100%',
					overflow: 'scroll',
					padding: 20,
				}}
				itemLayout='vertical'
				renderItem={(item) => {
					return getListItem(item);
				}}
			/>
			<div>
				<Input
					ref={messageInputRef}
					placeholder={'Type a message'}
					suffix={
						<UpCircleOutlined
							style={{ fontSize: '30px' }}
							rotate={90}
							onClick={() => handleInputSend(inputValue)}
						/>
					}
					onPressEnter={() => handleInputSend(inputValue)}
					onChange={handleInputChange}
					value={inputValue}
					style={{
						height: 60,
						padding: 15,
						border: 'none',
						borderTop: '1px solid #d9d9d9',
					}}
				/>
			</div>
		</div>
	) : (
		<div
			style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
			className='message-screen-chat'
		>
			<Typography.Title level={1} style={{ textAlign: 'center', marginTop: '20%' }}>
				Click on a chat to start the conversation
			</Typography.Title>
			<WhatsAppOutlined style={{ fontSize: '40px' }} />
		</div>
	);
};

export default MessageScreen;
