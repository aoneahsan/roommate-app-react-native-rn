import { ApiVersionsEnum } from "@/enums/backendApi";
import { AddressComponentTypeEnum } from "@/enums/capacitorApis";
import { FormFieldsEnum } from "@/utils/enums/formFieldsEnum";
import ENVS from "@/utils/envKeys";
import { ApiPathEnum } from "zaions-tool-kit";

export const getFullApiUrl = ({
  apiPath,
  apiVersion = ApiVersionsEnum.v1,
  itemId,
}: {
  apiPath: ApiPathEnum;
  apiVersion?: ApiVersionsEnum;
  itemId?: string;
}) => {
  let _url: string;
  if (ENVS.useLocalApis) {
    _url = `${ENVS.localApisCommonPath}/${apiPath}`;
  } else {
    _url = `https://${apiPath}${apiVersion}`;
  }

  if (itemId) {
    _url = `${_url}/${itemId}`;
  }

  return _url;
};

/**
 * Retrieves the value of a specific address component from an array of address components.
 *
 * @param components - An array of address component objects, each containing a `types` array and a `longText`.
 * @param type - The type of address component to retrieve, defined by `AddressComponentTypeEnum`.
 *
 * @returns The `longText` of the address component if found, otherwise `null`.
 *
 */
const getAddressComponent = ({
  components,
  type,
  isGeocodingApi,
}: {
  components?: google.maps.places.AddressComponent[];
  type: AddressComponentTypeEnum;
  isGeocodingApi?: boolean;
}): string | null => {
  const component = components?.find((comp) => comp.types.includes(type));
  return component
    ? isGeocodingApi
      ? (component as unknown as { long_name: string })?.long_name
      : component?.longText
    : null;
};

/**
 * Extracts detailed address information from a Google Maps Place object.
 *
 * @param place - The `google.maps.places.Place` object containing address components.
 *
 * @returns An object containing the extracted address details, including:
 * - `country`: The country component of the address.
 * - `streetAddress`: The street address component of the address.
 * - `aptSuite`: The apartment or suite component of the address.
 * - `city`: The city component of the address.
 * - `province`: The province or state component of the address.
 * - `postCode`: The postal code component of the address.
 */
export const extractAddressDetails = (place?: google.maps.places.Place) => {
  const components = place?.addressComponents;

  return {
    [FormFieldsEnum.country]: getAddressComponent({
      components,
      type: AddressComponentTypeEnum.COUNTRY,
    }),
    [FormFieldsEnum.streetAddress]: getAddressComponent({
      components,
      type: AddressComponentTypeEnum.STREET_ADDRESS,
    }),
    [FormFieldsEnum.aptSuit]: getAddressComponent({
      components,
      type: AddressComponentTypeEnum.APT_SUITE,
    }),
    [FormFieldsEnum.city]: getAddressComponent({
      components,
      type: AddressComponentTypeEnum.CITY,
    }),
    [FormFieldsEnum.province]: getAddressComponent({
      components,
      type: AddressComponentTypeEnum.PROVINCE,
    }),
    [FormFieldsEnum.postCode]: getAddressComponent({
      components,
      type: AddressComponentTypeEnum.POST_CODE,
    }),
  };
};

export const extractAddressDetailsFromGeocoding = (place?: any) => {
  const components = place?.address_components;

  return {
    [FormFieldsEnum.country]: getAddressComponent({
      components,
      type: AddressComponentTypeEnum.COUNTRY,
      isGeocodingApi: true,
    }),
    [FormFieldsEnum.streetAddress]: getAddressComponent({
      components,
      type: AddressComponentTypeEnum.STREET_ADDRESS,
      isGeocodingApi: true,
    }),
    [FormFieldsEnum.aptSuit]: getAddressComponent({
      components,
      type: AddressComponentTypeEnum.APT_SUITE,
      isGeocodingApi: true,
    }),
    [FormFieldsEnum.city]: getAddressComponent({
      components,
      type: AddressComponentTypeEnum.CITY,
      isGeocodingApi: true,
    }),
    [FormFieldsEnum.province]: getAddressComponent({
      components,
      type: AddressComponentTypeEnum.PROVINCE,
      isGeocodingApi: true,
    }),
    [FormFieldsEnum.postCode]: getAddressComponent({
      components,
      type: AddressComponentTypeEnum.POST_CODE,
      isGeocodingApi: true,
    }),
  };
};
