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
	credit: '/credit',
	iWantTo: '/i-want-to',
	postingListSub: {
		stepOne: `${AppRoutesCommonPath.postingList}/step-one`,
		stepTwo: `${AppRoutesCommonPath.postingList}/step-two`,
		stepThree: `${AppRoutesCommonPath.postingList}/step-three`,
		stepFour: `${AppRoutesCommonPath.postingList}/step-four`,
		stepFive: `${AppRoutesCommonPath.postingList}/step-five`,
		selectLocation: `${AppRoutesCommonPath.postingList}/select-location`
	},

	appSub: {
		placesList: {
			path: '/places-list',
			completePath: `${AppRoutesCommonPath.app}/places-list`,
		},

		profile: {
			path: '/profile',
			completePath: `${AppRoutesCommonPath.app}/profile`,
		},

		users: {
			path: '/users',
			completePath: `${AppRoutesCommonPath.app}/users`,
			filter: {
				path: '/users/filter',
				completePath: `${AppRoutesCommonPath.app}/users/filter`,
			}
		},

		messages: {
			path: '/messages',
			completePath: `${AppRoutesCommonPath.app}/messages`,
		},

		gigi: {
			path: '/gigi',
			completePath: `${AppRoutesCommonPath.app}/gigi`,
		},

		inboxNotifications: {
			path: '/inbox-notifications',
			completePath: `${AppRoutesCommonPath.app}/inbox-notifications`,
		},

		viewPerson: {
			path: '/view-person',
			completePath: `${AppRoutesCommonPath.app}/view-person`,
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
