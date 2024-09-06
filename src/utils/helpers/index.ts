import { fileErrorEnum } from "@/types/generic";
import { MESSAGES } from "../messages";
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

// Extend Day.js with the duration plugin
dayjs.extend(duration);


/**
 * Checks if the given value is a non-empty string.
 *
 * @param value - The string value to be checked.
 * @returns A boolean indicating whether the string is non-empty or not.
 */
export const isZNonEmptyString = (
	value: string | undefined | null
): boolean => {
	return value !== undefined && value !== null && value?.trim()?.length > 0;
};

/**
 * Converts a file size from bytes to megabytes (MB).
 *
 * @param {number} fileSizeInBytes - The file size in bytes.
 * @returns {number} - The file size in megabytes (MB), rounded to two decimal places.
 *
 * @example
 * const sizeInMB = convertFileSizeToMB(1048576);
 * console.log(sizeInMB); // Output: 1
 */
export const convertFileSizeToMB = (fileSizeInBytes: number) => {
	const bytesInMB = 1024 * 1024;
	return parseFloat((fileSizeInBytes / bytesInMB).toFixed(2));
};

/**
 * Converts a file size from megabytes (MB) to bytes.
 *
 * @param {number} fileSizeInMB - The file size in megabytes (MB).
 * @returns {number} - The file size in bytes.
 *
 * @example
 * const sizeInBytes = convertMBToFileSize(1);
 * console.log(sizeInBytes); // Output: 1048576
 */
export const convertMBToFileSize = (fileSizeInMB: number) => {
	const bytesInMB = 1024 * 1024;
	return fileSizeInMB * bytesInMB;
};

/**
 * Validates a file based on specified criteria such as size, type, and more.
 *
 * @param {Object} params - The parameters object.
 * @param {File} params.file - The file to validate.
 * @param {number} params.maxFileSizeMB - The maximum allowed file size.
 * @returns {object | null} - Returns an error object if validation fails, otherwise null.
 */
export const fileValidation = ({ file, maxFileSize }: { file: File; maxFileSize: number }) => {
	if (file.size > maxFileSize) {
		return {
			code: fileErrorEnum.sizeTooLarge,
			message: MESSAGES.file.maxSize(`${convertFileSizeToMB(maxFileSize)}MB`),
		};
	}

	return null;
};

/**
 * Calculates the duration between two dates and returns a human-readable string.
 * The function returns the most significant time unit only (e.g., years, months, weeks, etc.).
 * 
 * @param {string} firstDate - The starting date (format should be compatible with Day.js, e.g., 'YYYY-MM-DD' or 'October 1, 2020').
 * @param {string} secondDate - The ending date (format should be compatible with Day.js, e.g., 'YYYY-MM-DD' or 'October 1, 2021').
 * 
 * @returns {string} - A formatted string showing the most significant duration between the two dates, such as '1 Year', '3 Months', or '2 Weeks'.
 * 
 * @example
 * // Returns '1 Year'
 * calculateFullDuration('October 1, 2020', 'October 1, 2021');
 * 
 */
export const calculateFullDuration = (firstDate?: string, secondDate?: string): string => {
	const start = dayjs(firstDate);
	const end = dayjs(secondDate);

	// Calculate the difference in milliseconds
	const diffInMs = end.diff(start);
	// Create a Day.js duration object based on the difference
	const diffDuration = dayjs.duration(diffInMs);

	// Extract time components from the duration
	const years = diffDuration.years();
	const months = diffDuration.months();
	const weeks = Math.floor(diffDuration.asWeeks() % 4); // Weeks part after calculating months
	const days = diffDuration.days() % 7; // Days remaining after converting to full weeks
	const hours = diffDuration.hours();
	const minutes = diffDuration.minutes();
	const seconds = diffDuration.seconds();

	// Return the most significant time unit
	if (years > 0) return `${years} Year${years > 1 ? 's' : ''}`;
	if (months > 0) return `${months} Month${months > 1 ? 's' : ''}`;
	if (weeks > 0) return `${weeks} Week${weeks > 1 ? 's' : ''}`;
	if (days > 0) return `${days} Day${days > 1 ? 's' : ''}`;
	if (hours > 0) return `${hours} Hour${hours > 1 ? 's' : ''}`;
	if (minutes > 0) return `${minutes} Minute${minutes > 1 ? 's' : ''}`;
	if (seconds > 0) return `${seconds} Second${seconds > 1 ? 's' : ''}`;

	// Return '0 Seconds' if no time difference
	return '0 Seconds';
};