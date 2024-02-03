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
		replying: false,
		replyingTo: '',
		inputValue: '',
	}),
	actions({
		setCurrentUser: (user) => ({ user }),
		setCurrentChats: (chats) => ({ chats }),
		setReplying: (replying) => ({ replying }),
		setReplyingTo: (replyingTo) => ({ replyingTo }),
		setInputValue: (inputValue) => ({ inputValue }),
	}),
	reducers({
		currentUser: {
			setCurrentUser: (__, { user }) => user,
		},
		currentChats: {
			setCurrentChats: (__, { chats }) => chats,
		},
		replying: {
			setReplying: (__, { replying }) => replying,
		},
		replyingTo: {
			setReplyingTo: (__, { replyingTo }) => replyingTo,
		},
		inputValue: {
			setInputValue: (__, { inputValue }) => inputValue,
		},
	}),
]);
