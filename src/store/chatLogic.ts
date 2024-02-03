/**
 * @author Prakhar Richhariya <prakhar.richhariya@314ecorp.com>
 * @description Logic for managing chat
 */
import { kea, defaults, actions, reducers } from 'kea';

import { usersList } from 'src/assets/usersList';

export const chatLogic = kea([
	defaults({
		currentUser: null,
		currentChats: usersList,
	}),
	actions({
		setCurrentUser: (user) => ({ user }),
		setCurrentChats: (chats) => ({ chats }),
	}),
	reducers({
		currentUser: {
			setCurrentUser: (__, { user }) => user,
		},
		currentChats: {
			setCurrentChats: (__, { chats }) => chats,
		},
	}),
]);
