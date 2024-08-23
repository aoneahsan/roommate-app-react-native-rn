import { APP_ROUTES } from 'zaions-react-tool-kit';

export const routeParams = {
	jobId: '$jobId',
} as const;

const AppRoutesCommonPath = {
	app: '/app',
	testPages: '/test',
	postingList: '/posting-list'
} as const;

const AppRoutesE = {
	...APP_ROUTES,

	profile: '/profile',
	roomPreference: '/room-preference',
	hobbies: '/hobbies',
	myLifeStyle: '/my-life-style',
	roommatesPreference: '/roommates-preference',
	postingListSub: {
		stepOne: `${AppRoutesCommonPath.postingList}/step-one`,
		selectLocation: `${AppRoutesCommonPath.postingList}/select-location`
	},

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
