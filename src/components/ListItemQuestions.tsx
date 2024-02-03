/**
 * @author Prakhar Richhariya <prakhar.richhariya@314ecorp.com>
 * @description List Item Question for Chatbot
 */

import React from 'react';
import { Typography } from 'antd';

interface IProps {
	content: string;
	time: string;
}

const ListItemQuestions: React.FC<IProps> = (props) => {
	const { content, time } = props;
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
		</div>
	);
};

export default ListItemQuestions;
