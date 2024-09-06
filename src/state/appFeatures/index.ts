import { IAppFeaturesVisibility } from '@/types/appFeatures';
import { AppFeaturesVisibilityKeysEnum } from '@/utils/enums/formFieldsEnum';
import { atom } from 'recoil';

export const appFeaturesVisibilityRStateAtom = atom<IAppFeaturesVisibility>({
	key: 'appFeaturesVisibility_key',
	default: {
		processing: false,
		[AppFeaturesVisibilityKeysEnum.playerDashboard]: true,
		[AppFeaturesVisibilityKeysEnum.engagerDashboard]: true,
		[AppFeaturesVisibilityKeysEnum.adminDashboard]: true,
		[AppFeaturesVisibilityKeysEnum.users]: true,
		[AppFeaturesVisibilityKeysEnum.viewUser]: true,
		[AppFeaturesVisibilityKeysEnum.games]: true,
		[AppFeaturesVisibilityKeysEnum.gameRooms]: true,
		[AppFeaturesVisibilityKeysEnum.viewGameRoom]: true,
		[AppFeaturesVisibilityKeysEnum.topupRequests]: true,
		[AppFeaturesVisibilityKeysEnum.withdrawRequests]: true,
		[AppFeaturesVisibilityKeysEnum.inAppNotifications]: true,
		[AppFeaturesVisibilityKeysEnum.joinedGameRooms]: true,
		[AppFeaturesVisibilityKeysEnum.joinPrivateGameRoom]: true,
		[AppFeaturesVisibilityKeysEnum.topups]: true,
		[AppFeaturesVisibilityKeysEnum.withdraws]: true,
		[AppFeaturesVisibilityKeysEnum.transferCoins]: true,
		[AppFeaturesVisibilityKeysEnum.allTransferCoins]: true,
		[AppFeaturesVisibilityKeysEnum.notifications]: true,
		[AppFeaturesVisibilityKeysEnum.sendNotifications]: true,
		[AppFeaturesVisibilityKeysEnum.editNotifications]: true,
		[AppFeaturesVisibilityKeysEnum.availableGameRoomsTableInPlayerDashboard]:
			true,
		[AppFeaturesVisibilityKeysEnum.adminDashboardCoinsAppLogs]: true,
	},
});
