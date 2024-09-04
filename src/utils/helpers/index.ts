import { fileErrorEnum } from "@/types/generic";
import { MESSAGES } from "../messages";

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