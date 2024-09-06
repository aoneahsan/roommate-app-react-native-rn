import { ZBalconyOutlineIcon, ZClosetOutlineIcon, ZDoorOpenOutlineIcon, ZElectricBoltOutlineIcon, ZHeaterSvg, ZLaundryOutlineIcon, ZParkingCircleOutlineIcon, ZSecurityOutlineIcon, ZTvOutlineIcon, ZWashTemperatureOutlineIcon, ZWaterOutlineIcon, ZWifiOutlineIcon } from "@/assets";
import { rentInclusionsEnum } from "@/types/generic";

const ZRentInclusionsData = [
    { label: 'Wifi', value: rentInclusionsEnum.wifi, icon: ZWifiOutlineIcon },
    { label: 'Dish Wash', value: rentInclusionsEnum.dishWash, icon: ZWashTemperatureOutlineIcon },
    { label: 'TV', value: rentInclusionsEnum.tv, icon: ZTvOutlineIcon },
    { label: 'Heater', value: rentInclusionsEnum.heater, icon: ZHeaterSvg },
    { label: 'Closet', value: rentInclusionsEnum.closet, icon: ZClosetOutlineIcon },
    { label: 'Water', value: rentInclusionsEnum.water, icon: ZWaterOutlineIcon },
    { label: 'Balcony', value: rentInclusionsEnum.balcony, icon: ZBalconyOutlineIcon },
    { label: 'Personal Enter', value: rentInclusionsEnum.personalEnter, icon: ZDoorOpenOutlineIcon },
    { label: 'Electric', value: rentInclusionsEnum.electric, icon: ZElectricBoltOutlineIcon },
    { label: 'Laundry', value: rentInclusionsEnum.laundry, icon: ZLaundryOutlineIcon },
    { label: 'Security', value: rentInclusionsEnum.security, icon: ZSecurityOutlineIcon },
    { label: 'Parking', value: rentInclusionsEnum.parking, icon: ZParkingCircleOutlineIcon },
];

export default ZRentInclusionsData