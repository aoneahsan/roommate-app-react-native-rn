import {
	homeRoute,
	loginRoute,
	registerRoute,
	ProfileRoute,
	appRouteTree,
	RoomPreferenceRoute,
	HobbiesRoute,
	MyLifeStyleRoute,
	RoommatesPreferenceRoute,
	plStepOne,
	plStepTwo,
	plStepThree,
	plStepFour,
	selectLocationRoute
} from './AllRoutes';
import tanstackRootRoute from './RootRoute';
import testPagesRootRouteTree from './testPagesRoutes';

const routeTree = tanstackRootRoute.addChildren([
	homeRoute,
	loginRoute,
	registerRoute,
	ProfileRoute,
	RoomPreferenceRoute,
	HobbiesRoute,
	MyLifeStyleRoute,
	RoommatesPreferenceRoute,
	plStepOne,
	plStepTwo,
	plStepThree,
	plStepFour,
	selectLocationRoute,

	appRouteTree,
	testPagesRootRouteTree,
]);

export default routeTree;
