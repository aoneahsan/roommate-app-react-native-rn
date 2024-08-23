// Enums
export enum ZFormModeE {
	edit = 'edit',
	add = 'add',
}

export interface ILocationLatLng {
	lat: number;
	lng: number;
}

// Interfaces
export interface ILocation {
    country?: string
    streetAddress?: string,
    aptSuit?: string,
    city?: string,
    province?: string,
    postCode?: string,
}
