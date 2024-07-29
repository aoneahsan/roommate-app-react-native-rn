import { isZNonEmptyString } from 'zaions-tool-kit';

const _env = import.meta.env;
const isProduction = _env.PROD;
const isDevelopment = _env.DEV;

const cryptoSecret =
	_env.VITE_CRYPTO_SECRET ??
	"default crypto secret, if needed we can throw error here as well if it's somewhat sensitive info for the frontend";

const apiKey = _env.VITE_FRB_API_KEY;
const dbUrl = _env.VITE_FRB_DB_URL;
const projectId = _env.VITE_FRB_PROJECT_ID;
const messagingSenderId = _env.VITE_FRB_MESSAGING_SENDER_ID;
const appId = _env.VITE_FRB_APP_ID;
const measurementId = _env.VITE_FRB_MEASUREMENT_ID;

if (
	!isZNonEmptyString(apiKey) ||
	!isZNonEmptyString(dbUrl) ||
	!isZNonEmptyString(projectId) ||
	!isZNonEmptyString(messagingSenderId) ||
	!isZNonEmptyString(appId) ||
	!isZNonEmptyString(measurementId)
) {
	throw new Error(
		'Please provide proper firebase config details in ENV to continue.'
	);
}

const firebase = {
	apiKey,
	authDomain: `${projectId}.firebaseapp.com`,
	dbUrl,
	projectId,
	storageBucket: `${projectId}.appspot.com`,
	messagingSenderId,
	appId,
	measurementId,
} as const;

const useLocalApis = _env.VITE_USE_LOCAL_APIS === 'true';
const localApisCommonPath = _env.VITE_LOCAL_APIS_COMMON_PATH;

if (useLocalApis && !localApisCommonPath) {
	throw new Error(
		'"localApisCommonPath" is required when "useLocalApis" is set to true.'
	);
}

const ENVS = {
	isProduction,
	isDevelopment,
	cryptoSecret,
	firebase,
	useLocalApis,
	localApisCommonPath,
} as const;

export default ENVS;
