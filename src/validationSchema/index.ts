import { ZRUSelectValueI } from 'zaions-react-ui-kit';
import {
	LoginFormFieldsEnum,
	RegisterFormFieldsEnum,
	SearchArticlesFiltersFormFieldsEnum,
	UserAccountDataFormFieldsEnum,
	UserFormFieldsEnum,
} from '@/enums/formData';
import { FormFieldsEnum } from '@/utils/enums/formFieldsEnum';
import dayjs from 'dayjs';
import { z as ZOD } from 'zod';
import { agreementEnumVal, frequencyEnumVal, privateShareEnumVal } from './enumsVal';

const isValidRUSelectValue = (label: string) => ZOD?.object({
	value: ZOD?.string()?.trim()?.min(1, { message: `Not a Valid ${label}.` })?.max(100),
	label: ZOD?.string()?.trim()?.min(1, { message: `Not a Valid ${label}.` })?.max(100),
}, { message: `${label} is Required.` })

const isValidStringValue = (label: string) => ZOD?.string({ message: `${label} is Required.` })?.trim()?.min(1, { message: `${label} is Required.` })?.max(100)

const currencySchema = ZOD.object({
	label: isValidStringValue('Currency Label'),
	value: isValidStringValue('Currency Value'),
	symbol: ZOD?.string()?.trim()?.optional(),
});

export const userUpdateValidationSchema = ZOD.object({
	[UserFormFieldsEnum.name]: ZOD.string()
		.trim()
		.min(1, { message: 'Name is Required.' })
		.max(255),
	[UserFormFieldsEnum.phoneNumber]: ZOD.string()
		.trim()
		.min(13, { message: 'Phone number mush be minimum 13 digits' })
		.startsWith('+923'),
	[UserFormFieldsEnum.withdrawOptions]: ZOD.string().array().nonempty('Select minimum one option'),
});

export const registerFormValidationSchema = ZOD.object({
	[RegisterFormFieldsEnum.name]: ZOD.string()
		.trim()
		.min(1, { message: 'Name is Required.' })
		.max(255),
	[RegisterFormFieldsEnum.phoneNumber]: ZOD.string()
		.trim()
		.min(13, { message: 'Phone number mush be minimum 13 digits' })
		.startsWith('+923'),
	[RegisterFormFieldsEnum.email]: ZOD.string().email().max(255),
	[RegisterFormFieldsEnum.referralCode]: ZOD.optional(ZOD.string().min(6, { message: 'Referral code mush be minimum 6 digits' })),
	[RegisterFormFieldsEnum.withdrawOptions]: ZOD.string().array().nonempty('Select minimum one option'),
	[RegisterFormFieldsEnum.password]: ZOD.string().min(6).max(30),
	[RegisterFormFieldsEnum.passwordConfirmation]: ZOD.string().min(6).max(30),
}).superRefine((values, ctx) => {
	if (
		values[RegisterFormFieldsEnum.passwordConfirmation] !==
		values[RegisterFormFieldsEnum.password]
	) {
		ctx.addIssue({
			code: 'custom',
			message: 'The passwords did not match',
			path: [RegisterFormFieldsEnum.passwordConfirmation],
		});
	}
});

export const loginFormValidationSchema = ZOD.object({
	[LoginFormFieldsEnum.email]: ZOD.string().email().max(255),
	[LoginFormFieldsEnum.password]: ZOD.string().min(6).max(30),
});

export const userAccountFormValidationSchema = ZOD.object({
	[UserAccountDataFormFieldsEnum.name]: ZOD.string()
		.trim()
		.min(1, { message: 'Name is Required.' })
		.max(255),
});

export const searchArticlesFormValidationSchema = ZOD.object({
	[SearchArticlesFiltersFormFieldsEnum.keyword]: ZOD.string().trim().max(255),
	[SearchArticlesFiltersFormFieldsEnum.startDate]: ZOD.string(),
	[SearchArticlesFiltersFormFieldsEnum.endDate]: ZOD.string(),
	[SearchArticlesFiltersFormFieldsEnum.category]: ZOD.string().trim().max(255),
	[SearchArticlesFiltersFormFieldsEnum.source]: ZOD.string().trim().max(255),
}).superRefine((values, ctx) => {
	const startDateStr = values[SearchArticlesFiltersFormFieldsEnum.startDate];
	const endDateStr = values[SearchArticlesFiltersFormFieldsEnum.endDate];

	if (startDateStr.trim().length > 0 && endDateStr.trim().length > 0) {
		if (startDateStr === endDateStr) {
			ctx.addIssue({
				code: 'custom',
				message: 'Start Date can not be equal to end date.',
				path: [SearchArticlesFiltersFormFieldsEnum.startDate],
			});
		} else {
			let startDate;
			try {
				startDate = dayjs(startDateStr);
			} catch (error) {
				ctx.addIssue({
					code: 'custom',
					message: 'Invalid Start Date value.',
					path: [SearchArticlesFiltersFormFieldsEnum.startDate],
				});
			}

			let endDate;
			try {
				endDate = dayjs(endDateStr);
			} catch (error) {
				ctx.addIssue({
					code: 'custom',
					message: 'Invalid End Date value.',
					path: [SearchArticlesFiltersFormFieldsEnum.endDate],
				});
			}

			if (startDate && endDate) {
				const endDateIsBeforeStartDate = dayjs(endDate).isBefore(startDate);
				if (endDateIsBeforeStartDate) {
					ctx.addIssue({
						code: 'custom',
						message: 'End Date can not be before Start Date.',
						path: [SearchArticlesFiltersFormFieldsEnum.endDate],
					});
				}
			}
		}
	}
});


export const profileFormValidationSchema = ZOD.object({
	[FormFieldsEnum.name]: isValidStringValue('Name'),
	[FormFieldsEnum.age]: isValidRUSelectValue('Age'),
	[FormFieldsEnum.gender]: isValidRUSelectValue('Gender'),
	[FormFieldsEnum.constellations]: isValidRUSelectValue('Constellations'),
	[FormFieldsEnum.hometown]: isValidRUSelectValue('Hometown'),
	[FormFieldsEnum.language]: isValidRUSelectValue('Language'),
});

export const roomPreferenceFormValidationSchema = ZOD.object({
	[FormFieldsEnum.desiredPlace]: isValidRUSelectValue('Desired place'),
	[FormFieldsEnum.placePreference]: isValidStringValue('Place preference'),
	[FormFieldsEnum.moveInDate]: isValidStringValue('Move in date'),
	[FormFieldsEnum.buildingType]: isValidStringValue('Building type'),
	[FormFieldsEnum.minBudget]: ZOD.number({ message: 'Min budget is Required.' }).nonnegative({ message: 'Min budget mush be a non-negative number.' }),
	[FormFieldsEnum.maxBudget]: ZOD.number({ message: 'Max budget is Required.' }).positive({ message: 'Max budget mush be a positive number.' })
});

export const locationValidationSchema = ZOD.object({
	[FormFieldsEnum.country]: isValidStringValue('Country'),
	[FormFieldsEnum.city]: isValidStringValue('City'),
	[FormFieldsEnum.aptSuit]: ZOD.string().trim().optional(),
	[FormFieldsEnum.postCode]: isValidStringValue('Post code'),
	[FormFieldsEnum.province]: isValidStringValue('Province'),
	[FormFieldsEnum.streetAddress]: ZOD?.string({ message: 'Street address is Required.' })
		.trim()
		.min(1, { message: 'Street address is Required.' }),
})

// Schema for the rentFee object validation
const rentFeeSchema = ZOD?.object({
	[FormFieldsEnum.currency]: currencySchema?.optional(),
	[FormFieldsEnum.prize]: isValidStringValue('Prize'),
}, { message: 'Rent fee is required.' });

export const postingListStepOneValidationSchema = ZOD.object({
	[FormFieldsEnum.title]: ZOD?.string({ message: 'Title is Required.' })
		.trim()
		.min(1, { message: 'Title is Required.' }),
	[FormFieldsEnum.buildingType]: isValidStringValue('Building type'),
	[FormFieldsEnum.location]: ZOD?.object({}, { message: 'Location is required.' }),
	[FormFieldsEnum.placePreference]: isValidStringValue('Place'),
	[FormFieldsEnum.rentFee]: rentFeeSchema,
})

export const postingListStepThreeValidationSchema = ZOD.object({
	[FormFieldsEnum.moveInDate]: ZOD.string({
		message: "Move-in date is required",
	}),
	[FormFieldsEnum.moveOutDate]: ZOD.string({
		message: "Move-out date is required",
	}),

	[FormFieldsEnum.description]: ZOD.string().optional(),

	[FormFieldsEnum.frequency]: ZOD.enum(frequencyEnumVal, {
		required_error: "Frequency is required.",
		invalid_type_error: "Invalid frequency value",
	}),

	[FormFieldsEnum.numOfBedroom]: ZOD.number({
		required_error: "Number of bedrooms is required",
	}).nonnegative({ message: "Number of bedrooms must be a non-negative number" }),

	[FormFieldsEnum.numOfParking]: ZOD.number({
		required_error: "Number of parking spots is required",
	}).nonnegative({ message: "Number of parking spots must be a non-negative number" }),

	[FormFieldsEnum.numOfWashroom]: ZOD.number({
		required_error: "Number of washrooms is required",
	}).nonnegative({ message: "Number of washrooms must be a non-negative number" }),

	[FormFieldsEnum.minimumLease]: ZOD.number({
		required_error: "Minimum lease period is required",
	}).nonnegative({ message: "Minimum lease period must be a non-negative number" }),

	[FormFieldsEnum.pets]: ZOD.enum(agreementEnumVal, {
		invalid_type_error: "Invalid value for pets",
		required_error: "Pets is required."
	}),

	[FormFieldsEnum.smoke]: ZOD.enum(agreementEnumVal, {
		invalid_type_error: "Invalid value for smoke",
		required_error: "Smoke is required."
	}),

	[FormFieldsEnum.furnished]: ZOD.enum(agreementEnumVal, {
		invalid_type_error: "Invalid value for furnished",
		required_error: "Furnished is required."
	}),
}).superRefine((data, ctx) => {
	const moveInDate = dayjs(data?.[FormFieldsEnum.moveInDate]);
	const moveOutDate = dayjs(data?.[FormFieldsEnum.moveOutDate]);
	if (!moveInDate?.isValid()) {
		ctx.addIssue({
			path: [FormFieldsEnum.moveInDate],
			message: "Move-in date should be a valid date",
			code: 'custom'
		});
	}

	if (!moveOutDate?.isValid()) {
		ctx.addIssue({
			code: 'custom',
			message: "Move-out date should be a valid date",
			path: [FormFieldsEnum.moveOutDate],
		});
	}

	if (moveOutDate.isBefore(moveInDate)) {
		ctx.addIssue({
			code: 'custom',
			message: "Move-out date must be after move-in date",
			path: [FormFieldsEnum.moveOutDate],
		});
	}
});

export const postingListStepFourValidationSchema = ZOD.object({
	[FormFieldsEnum.bedroom]: ZOD.enum(privateShareEnumVal, {
		required_error: "Required.",
		invalid_type_error: "Invalid value",
	}),
	[FormFieldsEnum.livingRoom]: ZOD.enum(privateShareEnumVal, {
		message: "Required.",
	}),
	[FormFieldsEnum.kitchen]: ZOD.enum(privateShareEnumVal, {
		message: "Required.",
	}),
	[FormFieldsEnum.washroom]: ZOD.enum(privateShareEnumVal, {
		message: "Required.",
	}),
	[FormFieldsEnum.livingWithLandlord]: ZOD.enum(agreementEnumVal, {
		message: "Required.",
	}),
})