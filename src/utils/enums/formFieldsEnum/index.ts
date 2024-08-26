export enum FormFieldsEnum {
	// Generic/Common Form Fields
	id = 'id',
	userId = 'userId',
	itemId = 'itemId',
	playerId = 'playerId',
	createdAt = 'createdAt',
	updatedAt = 'updatedAt',
	deletedAt = 'deletedAt',
	blockedAt = 'blockedAt',
	isActive = 'isActive',
	sortOrderNo = 'sortOrderNo',
	userData = 'userData', // logged in user data return key
	playerData = 'playerData', // player user data return key (used in topup requests)
	otherPlayerId = 'otherPlayerId',
	otherPlayerData = 'otherPlayerData',

	title = 'title',
	description = 'description',

	// User related Forms Fields Enum
	name = 'name',
	email = 'email',
	phoneNumber = 'phoneNumber',
	password = 'password',
	passwordConfirmation = 'passwordConfirmation',
	withdrawOptions = 'withdrawOptions',
	cnic = 'cnic',
	city = 'city',
	country = 'country',
	address = 'address',
	referredBy = 'referredBy',
	referralCode = 'referralCode',
	disabled = 'disabled',
	photoURL = 'photoURL',
	emailVerified = 'emailVerified',
	emailVerifiedAt = 'emailVerifiedAt',
	balance = 'balance',
	permissions = 'permissions',
	role = 'role',
	customClaims = 'customClaims',
	age = 'age',
	constellations = 'constellations',
	hometown = 'hometown',
	gender = 'gender',
	language = 'language',


	// Game related Forms Fields Enum
	maxPlayersAllowed = 'maxPlayersAllowed',
	feePerPlayer = 'feePerPlayer',
	serviceCharges = 'serviceCharges',
	image = 'image',
	minPlayersToStartGame = 'minPlayersToStartGame',

	// Game Room Fields
	isPrivate = 'isPrivate',
	roomCode = 'roomCode',
	status = 'status',
	gameId = 'gameId',
	gameData = 'gameData',
	gameRoomPlayerIds = 'gameRoomPlayerIds',
	gameRoomPlayersData = 'gameRoomPlayersData',
	gameRoomWillStartAt = 'gameRoomWillStartAt', // count down timer to show, when the game room with start the game
	gameRoomStartedAt = 'gameRoomStartedAt', // we will use this to show a timer (count down) timer to players to join the actual game, once engager has started the game.
	gameRoomWinnerPlayerId = 'gameRoomWinnerPlayerId',
	gameRoomResultScreenShot = 'gameRoomResultScreenShot',

	// Top ups
	amount = 'amount',
	agentRemarks = 'agentRemarks',
	transferMethod = 'transferMethod',
	receptScreenshot = 'receptScreenshot',
	transactionId = 'transactionId',

	// Transaction Fields
	// use itemId to store topup/withdraw/transfer request ID
	balanceBefore = 'balanceBefore',
	balanceAfter = 'balanceAfter',
	type = 'type',
	adminUserId = 'adminUserId',

	// Transfer Coins
	otherPlayerPhoneNumber = 'otherPlayerPhoneNumber',
	userRemarks = 'userRemarks',

	// generic
	queryKeyValue = 'queryKeyValue',
	queryKeyType = 'queryKeyType',
	nextPageToken = 'nextPageToken',

	// testing
	apiKey1 = 'v89h249v2--c--3-3-3-f-ff-fff-f-f-f-f-ff-f-igh872gv23g97293', // it's okay to leave it here, as the value we are checking against it is stored in our project.

	// AppUserLog
	totalTopupCoins = 'totalTopupCoins',
	totalWithdrawCoins = 'totalWithdrawCoins',
	totalWonCoins = 'totalWonCoins',
	totalTransferredCoins = 'totalTransferredCoins',
	totalReceivedCoins = 'totalReceivedCoins',
	totalLostCoins = 'totalLostCoins',
	totalGamesPlayed = 'totalGamesPlayed',
	totalGamesLeft = 'totalGamesLeft',
	totalGamesWon = 'totalGamesWon',
	totalGamesLost = 'totalGamesLost',
	gameWinStreak = 'gameWinStreak',
	gameLostStreak = 'gameLostStreak',
	lastGamePlayedAt = 'lastGamePlayedAt',
	lastGameLeftAt = 'lastGameLeftAt',
	lastGameWonAt = 'lastGameWonAt',
	lastGameLostAt = 'lastGameLostAt',

	// InApp Notifications
	icon = 'icon',
	sendAt = 'sendAt',
	sendTo = 'sendTo',
	specificUsersPhoneNumbers = 'specificUsersPhoneNumbers', // used to find users (specific) users we need to send the InApp Notification created by adminUser.
	saveAsDraft = 'saveAsDraft', // there will be no alternative value for this in DB Column short keys, as we will set the notification status to draft when user requests this

	// AppUserRoles & Permissions
	roleIdentifier = 'roleIdentifier',
	isDefault = 'isDefault',

	// Room 
	desiredPlace = 'desiredPlace',
	placePreference = 'placePreference',
	moveInDate = 'moveInDate',
	buildingType = 'buildingType',
	minBudget = 'minBudget',
	maxBudget = 'maxBudget',

	// location
	aptSuit = 'aptSuit',
	postCode = 'postCode',
	province = 'province',
	streetAddress = 'streetAddress',
	formattedAddress = 'formattedAddress'
}
