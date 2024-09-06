import { AppFeaturesVisibilityKeysEnum } from '@/utils/enums/formFieldsEnum';

export interface IAppFeaturesVisibility {
	[AppFeaturesVisibilityKeysEnum.processing]?: boolean;
	[AppFeaturesVisibilityKeysEnum.error]?: boolean;
	[AppFeaturesVisibilityKeysEnum.errorMessage]?: string;
	[AppFeaturesVisibilityKeysEnum.playerDashboard]: boolean;
	[AppFeaturesVisibilityKeysEnum.engagerDashboard]: boolean;
	[AppFeaturesVisibilityKeysEnum.adminDashboard]: boolean;
	[AppFeaturesVisibilityKeysEnum.users]: boolean;
	[AppFeaturesVisibilityKeysEnum.viewUser]: boolean;
	[AppFeaturesVisibilityKeysEnum.games]: boolean;
	[AppFeaturesVisibilityKeysEnum.gameRooms]: boolean;
	[AppFeaturesVisibilityKeysEnum.viewGameRoom]: boolean;
	[AppFeaturesVisibilityKeysEnum.topupRequests]: boolean;
	[AppFeaturesVisibilityKeysEnum.withdrawRequests]: boolean;
	[AppFeaturesVisibilityKeysEnum.inAppNotifications]: boolean;
	[AppFeaturesVisibilityKeysEnum.joinedGameRooms]: boolean;
	[AppFeaturesVisibilityKeysEnum.joinPrivateGameRoom]: boolean;
	[AppFeaturesVisibilityKeysEnum.topups]: boolean;
	[AppFeaturesVisibilityKeysEnum.withdraws]: boolean;
	[AppFeaturesVisibilityKeysEnum.transferCoins]: boolean;
	[AppFeaturesVisibilityKeysEnum.allTransferCoins]: boolean;
	[AppFeaturesVisibilityKeysEnum.notifications]: boolean;
	[AppFeaturesVisibilityKeysEnum.sendNotifications]: boolean;
	[AppFeaturesVisibilityKeysEnum.editNotifications]: boolean;
	[AppFeaturesVisibilityKeysEnum.availableGameRoomsTableInPlayerDashboard]: boolean;
	[AppFeaturesVisibilityKeysEnum.adminDashboardCoinsAppLogs]: boolean;
}
