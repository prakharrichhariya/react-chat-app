/**
 * @author Prakhar Richhariya <prakhar.richhariya@314ecorp.com>
 * @description List item for answers of Chatbot
 */

import React from 'react';
import { Avatar, Typography } from 'antd';
import DOMPurify from 'dompurify';

import { useValues } from 'kea';
import { chatLogic } from '../store/chatLogic';

interface IProps {
	content: string;
	time: string;
	type: 'answer' | 'loading' | 'helpText';
}

const ListItemAnswers: React.FC<IProps> = (props) => {
	const { content, time, type } = props;
	const { currentUser } = useValues(chatLogic);

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
			</div>
		</div>
	);
};

export default ListItemAnswers;
