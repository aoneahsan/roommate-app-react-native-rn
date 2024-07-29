export enum ResponseCodeEnum {
	notFound = 'notFound',
	badRequest = 'badRequest',
	serverError = 'serverError',
	success = 'success',
	itemExists = 'itemExists',
}

export enum ResponseStatusEnum {
	success = 200,
	created = 201,
	failed = 500,
	notFound = 404,
	unAuthenticated = 401,
	invalidData = 422,
	badRequest = 400,
}

export enum ApiPathEnum {
	register = 'register',
	login = 'login',
	logout = 'logout',
	deleteUser = 'deleteuser',
	getPersonalAccountData = 'getpersonalaccountdata',
	getUser = 'getuser',
	updatePersonalAccountData = 'updatepersonalaccountdata',
	updateUser = 'updateuser',
	listUsers = 'listusers',
	getDashboardData = 'getdashboarddata',
	blockUser = 'blockuser',
	unblockUser = 'unblockuser',
	listGames = 'listgames',
	getGame = 'getgame',
	createGame = 'creategame',
	updateGame = 'updategame',
	deleteGame = 'deletegame',
	listGameRooms = 'listgamerooms',
	createGameRoom = 'creategameroom',
	updateGameRoom = 'updategameroom',
	deleteGameRoom = 'deletegameroom',
	getEngagerDashboardData = 'getengagerdashboarddata',
	getAvailableGameRooms = 'getavailablegamerooms'
}

/**
 * this will define the ending common path for apis we need to merge the "ApiPathEnum" with
 */
export enum ApiVersionsEnum {
	v1 = '-k7mzhojhoq-uc.a.run.app',
}
