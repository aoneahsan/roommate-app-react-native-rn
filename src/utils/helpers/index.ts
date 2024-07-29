
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
