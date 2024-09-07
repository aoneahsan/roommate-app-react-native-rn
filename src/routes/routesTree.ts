import {
	homeRoute,
	loginRoute,
	registerRoute,
	profileRoute,
	appRouteTree,
	roomPreferenceRoute,
	hobbiesRoute,
	myLifeStyleRoute,
	roommatesPreferenceRoute,
	creditRoute,
	plStepOne,
	plStepTwo,
	plStepThree,
	plStepFour,
	plStepFive,
	selectLocationRoute,
	iWantToRoute
} from './AllRoutes';
import tanstackRootRoute from './RootRoute';
import testPagesRootRouteTree from './testPagesRoutes';

const routeTree = tanstackRootRoute.addChildren([
	homeRoute,
	loginRoute,
	registerRoute,
	profileRoute,
	roomPreferenceRoute,
	hobbiesRoute,
	myLifeStyleRoute,
	roommatesPreferenceRoute,
	creditRoute,
	plStepOne,
	plStepTwo,
	plStepThree,
	plStepFour,
	plStepFive,
	selectLocationRoute,
	iWantToRoute,

	appRouteTree,
	testPagesRootRouteTree,
]);

export default routeTree;
