/**
 * @author Prakhar Richhariya <prakhar.richhariya@314ecorp.com>
 * @description Message Sidebar Component
 */
import React from 'react';
import _ from 'lodash';
import { useActions, useValues } from 'kea';
import { Avatar, Button, Dropdown, List, MenuProps, Modal, Typography } from 'antd';
import { DownOutlined, WhatsAppOutlined } from '@ant-design/icons';

import { chatLogic } from '../store/chatLogic';

const MessageSidebar: React.FC = () => {
	const { currentChats, currentUser } = useValues(chatLogic);
	const { setCurrentUser, setCurrentChats } = useActions(chatLogic);

	const handleListItemClick = (item: any) => {
		setCurrentUser(item);
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

	return (
		<div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
			<div
				style={{
					borderBottom: '1px solid #424242',
					borderRight: '1px solid #424242',
					display: 'flex',
					flexDirection: 'row',
					gap: '20px',
					alignItems: 'center',
					padding: '22px',
				}}
			>
				<WhatsAppOutlined style={{ color: 'black', fontSize: 25 }} />
				<div style={{ fontSize: 22, fontWeight: 'bold' }}>React Chat App</div>
			</div>
			<List
				itemLayout='horizontal'
				dataSource={currentChats}
				style={{ height: '100%' }}
				renderItem={(item: any) => (
					<List.Item
						key={item.userId}
						extra={
							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									justifyContent: 'flex-end',
									alignItems: 'flex-end',
								}}
							>
								<div>
									<Typography.Text style={{ fontSize: '10px' }}>
										{_.get(_.last(item.messageList), 'time')}
									</Typography.Text>
								</div>

								<div>
									<Dropdown trigger={['click']} menu={{ items }}>
										<Button
											icon={<DownOutlined />}
											type='text'
											onClick={(e) => e.stopPropagation()}
										/>
									</Dropdown>
								</div>
							</div>
						}
						onClick={() => handleListItemClick(item)}
						className='chat-list-item'
					>
						<List.Item.Meta
							avatar={<Avatar src={item.icon} />}
							title={item.name}
							description={_.get(_.last(item.messageList), 'content')}
						/>
					</List.Item>
				)}
				bordered
			/>
		</div>
	);
};

export default MessageSidebar;
