export enum FormFieldsEnum {
	// Generic/Common Form Fields
	id = 'id',
	userId = 'userId',
	itemId = 'itemId',
	createdAt = 'createdAt',
	updatedAt = 'updatedAt',
	deletedAt = 'deletedAt',
	blockedAt = 'blockedAt',
	isActive = 'isActive',
	sortOrderNo = 'sortOrderNo',

	title = 'title',
	description = 'description',
	actions = 'actions',

	// User related Forms Fields Enum
	name = 'name',
	email = 'email',
	phoneNumber = 'phoneNumber',
	isBlocked = 'isBlocked',
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
	age = 'age',
	gender = 'gender',
	constellations = 'constellations',
	hometown = 'hometown',
	language = 'language',

	// Game related Forms Fields Enum
	personsAllowed = 'personsAllowed',
	feePerPerson = 'feePerPerson',
	serviceCharges = 'serviceCharges',
	image = 'image',

	// Game Room Fields
	isPrivate = 'isPrivate',
	roomCode = 'roomCode',
	status = 'status',
	gameId = 'gameId',
	gameData = 'gameData',

	// Top up
	amount = 'amount',
	agentRemarks = 'agentRemarks',
	transferMethod = 'transferMethod',
	receptScreenshot = 'receptScreenshot',
}
