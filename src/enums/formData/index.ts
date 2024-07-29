export enum UserFormFieldsEnum {
	name = 'name',
	phoneNumber = 'phoneNumber',
	withdrawOptions = 'withdrawOptions',
	city = 'city',
	country = 'country',
	referralCode = 'referralCode',
	email = 'email',
}

export enum RegisterFormFieldsEnum {
	name = 'name',
	phoneNumber = 'phoneNumber',
	withdrawOptions = 'withdrawOptions',
	city = 'city',
	country = 'country',
	referralCode = 'referralCode',
	email = 'email',
	password = 'password',
	passwordConfirmation = 'passwordConfirmation',
}

export enum LoginFormFieldsEnum {
	email = 'email',
	password = 'password',
}

export enum ResetPasswordFormFieldsEnum {
	email = 'email',
	phoneNumber = 'phoneNumber',
	otp = 'otp',
	password = 'password',
	passwordConfirmation = 'passwordConfirmation',
}

export enum UserAccountDataFormFieldsEnum {
	name = 'name',
}

export enum SearchArticlesFiltersFormFieldsEnum {
	keyword = 'keyword',
	startDate = 'startDate',
	endDate = 'endDate',
	category = 'category',
	source = 'source',
}

export enum NewsFeedPreferenceFormFieldsEnum {
	categories = 'categories',
	sources = 'sources',
	authors = 'authors',
}
