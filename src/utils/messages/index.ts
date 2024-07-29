import { zrtkMessages } from 'zaions-react-tool-kit';
import { ztkMessages } from 'zaions-tool-kit';
export const MESSAGES = {
	...ztkMessages,
	...zrtkMessages,

	errors: {
		authCheckFailed: 'Check Failed',
		userAlreadyExists: 'User with this email or phone number already exists',
		invalidCredential: 'Invalid credential'
	},

	game: {
		createdSuccessfully: 'Game created successfully.',
		updatedSuccessfully: 'Game updated successfully.',
		deletedSuccessfully: 'Game delete successfully.',
		notFount: 'Game not found'
	}

} as const;
