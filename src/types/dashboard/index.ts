import { IUser } from "../user/index.type";
// Interfaces
export interface IDashboard {
    activeUsers?: Array<IUser>
    activeUsersCount?: number
    inActiveUsers?: Array<IUser>
    inActiveUsersCount?: number
    totalUsersCount?: number
    users?: Array<IUser>
    coinsInSystem?: number
    coinsIssued?: number
    coinsWithDrawn?: number
}
