/**
 * @author Prakhar Richhariya <prakhar.richhariya@314ecorp.com>
 * @description Main App Component
 */
import React from 'react';
import { ConfigProvider } from 'antd';

import './App.css';
import './styles/styles.css';
import MessageSidebar from './components/MessageSidebar';
import MessageScreen from './components/MessageScreen';

const App: React.FC = () => {
	return (
		<ConfigProvider
			theme={{
				token: {
					colorPrimary: '#424242',
				},
			}}
		>
			<div className='App'>
				<div style={{ width: '25%', height: '100%' }}>
					<MessageSidebar />
				</div>
				<div
					style={{
						width: '75%',
						height: '100%',
					}}
				>
					<MessageScreen />
				</div>
			</div>
		</ConfigProvider>
	);
};

export default App;
