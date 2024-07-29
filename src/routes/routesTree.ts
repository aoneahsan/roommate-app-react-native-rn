import {
	homeRoute,
	loginRoute,
	registerRoute,
	ProfileRoute,
	appRouteTree,
	RoomPreferenceRoute,
	HobbiesRoute,
	MyLifeStyleRoute,
	RoommatesPreferenceRoute
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

	appRouteTree,
	testPagesRootRouteTree,
]);

export default routeTree;
