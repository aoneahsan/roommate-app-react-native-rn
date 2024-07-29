import { IGame } from "../game"

// Enums
export enum ZGameRoomStatusE {
    waitingForPlayers = 'waitingForPlayers',
    inProgress = 'inProgress',
    waitingForResult = 'waitingForResult',
    completed = 'completed',
}

export enum ZGameRoomTableColumnsIds {
    id = '__z_game_room_id__',
    title = '__z_game_room_title__',
    description = '__z_game_room_description__',
    roomCode = '__z_game_room_code__',
    gameTitle = '__z_game_room_game_title__',
    status = '__z_game_room_status__',
    private = '__z_game_room_private__',
    actions = '__z_game_room_actions__',
}

// Interface
export interface IGameRoom {
    id?: string
    gameId?: string
    userId?: string
    gameData?: IGame
    title?: string
    gameTitle?: string
    description?: string
    roomCode?: string
    status?: ZGameRoomStatusE
    isPrivate?: boolean
    isActive?: boolean
    createdAt?: string
    updatedAt?: string
    deletedAt?: string
}
