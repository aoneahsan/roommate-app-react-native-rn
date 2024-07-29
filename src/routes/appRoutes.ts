import { APP_ROUTES } from 'zaions-react-tool-kit';

export const routeParams = {
	jobId: '$jobId',
} as const;

const AppRoutesCommonPath = {
	app: '/app',
	testPages: '/test',
} as const;

const AppRoutesE = {
	...APP_ROUTES,

	profile: '/profile',
	roomPreference: '/room-preference',
	hobbies: '/hobbies',
	myLifeStyle: '/my-life-style',
	roommatesPreference: '/roommates-preference',

	appSub: {
		dashboard: {
			path: '/dashboard',
			completePath: `${AppRoutesCommonPath.app}/dashboard`,
		},

		games: {
			path: '/games',
			completePath: `${AppRoutesCommonPath.app}/games`,
		}
	},

	testPagesSub: {
		firebaseTesting: `${AppRoutesCommonPath.testPages}/firebase-testing`,
	},
} as const;

// export const getFullPage

export const AppRoutes = {
	...AppRoutesCommonPath,
	...AppRoutesE,
} as const;
