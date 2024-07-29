// Enums
export enum ZGameTableColumnsIds {
    id = '__z_game_id__',
    title = '__z_game_title__',
    description = '__z_game_description__',
    personsAllowed = '__z_game_persons_allowed__',
    feePerPerson = '__z_game_fee_per_person__',
    serviceCharges = '__z_game_service_charges__',
    image = '__z_game_image__',
    engagerServiceCharges = '__z_game_engager_service_charges__',
    actions = '__z_game_actions__'
}

// Interfaces
export interface IGame {
    id?: string,
    title?: string,
    description?: string,
    personsAllowed?: number,
    feePerPerson?: number,
    serviceCharges?: number,
    image?: string,
}
