import ENVS from '@/utils/envKeys';
import { type FirebaseApp, initializeApp, setLogLevel } from 'firebase/app';

let _frbApp: FirebaseApp | null = null;

export const getFrbAppInstance = (options?: {
	frbAppName?: string;
	logLevel?: 'debug' | 'verbose' | 'info' | 'warn' | 'error' | 'silent';
}): FirebaseApp => {
	if (_frbApp) {
		return _frbApp;
	} else {
		const {
			logLevel = ENVS.isProduction ? 'error' : 'debug',
			frbAppName = 'Ahsan-Learn-P1',
		} = options || {};

		_frbApp = initializeApp(
			{
				apiKey: ENVS.firebase.apiKey,
				appId: ENVS.firebase.appId,
				authDomain: ENVS.firebase.authDomain,
				databaseURL: ENVS.firebase.dbUrl,
				measurementId: ENVS.firebase.measurementId,
				messagingSenderId: ENVS.firebase.messagingSenderId,
				projectId: ENVS.firebase.projectId,
				storageBucket: ENVS.firebase.storageBucket,
			},
			{
				name: frbAppName,
			}
		);

		setLogLevel(logLevel);

		return _frbApp;
	}
};
