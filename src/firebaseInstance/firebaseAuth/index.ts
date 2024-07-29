import ENVS from '@/utils/envKeys';
import { getFrbAppInstance } from '../firebaseApp';
import {
	type Auth,
	initializeAuth,
	browserLocalPersistence,
	indexedDBLocalPersistence,
	browserSessionPersistence,
	connectAuthEmulator,
} from 'firebase/auth';

let _frbAuth: Auth | null = null;

export const getFrbAuthInstance = (): Auth => {
	if (_frbAuth) {
		return _frbAuth;
	} else {
		const frbApp = getFrbAppInstance();

		_frbAuth = initializeAuth(frbApp, {
			persistence: [
				browserLocalPersistence,
				indexedDBLocalPersistence,
				browserSessionPersistence,
			],
		});

		if (ENVS.useLocalApis) {
			connectAuthEmulator(_frbAuth, 'http://127.0.0.1:9099', {
				disableWarnings: true,
			});
		}

		return _frbAuth;
	}
};
