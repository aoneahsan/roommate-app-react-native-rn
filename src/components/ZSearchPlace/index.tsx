// #region ---- Core Imports ----
import React, { useCallback, useState } from "react";

// #endregion

// #region ---- Packages Imports ----
import {
  ZAccordingGroup,
  ZAccordionContent,
  ZAccordionItem,
  ZAccordionTrigger,
  ZBox,
  ZButton,
  ZCard,
  ZDataList,
  ZFlex,
  ZHeading,
  ZInput,
  ZRUAlignE,
  ZRUColorE,
  ZRUHeadingAsE,
  ZRUJustifyE,
  ZSeparator,
  ZSpinner,
  ZText,
} from "zaions-react-ui-kit";
import { isZNonEmptyString, reportCustomError } from "zaions-tool-kit";

// #endregion

// #region ---- Custom Imports ----
import { autoComplete } from "@/googleApisInstance/placesApi";
import constants from "@/utils/constants";
import { extractAddressDetails } from "@/utils/helpers/apiHelpers";

// #endregion

// #region ---- Images Imports ----
import { ZSearchLocationOutlineIcon } from "@/assets";
import { FormFieldsEnum } from "@/utils/enums/formFieldsEnum";
import filedLimits from "@/utils/constants/fieldLimits";

// #endregion

const ZSearchPlace: React.FC<{
  disabled?: boolean;
  loading?: boolean;
  onSelect?: (place: google.maps.places.Place) => void;
}> = (props) => {
  const [input, setInput] = useState<string>("");
  const [processing, setProcessing] = useState<boolean>(false);
  const [autoCompleteResult, setAutoCompleteResult] = useState<{
    errorMessage?: string;
    infoMessage?: string;
    items?: google.maps.places.Place[];
    touched?: boolean;
  }>({
    errorMessage: "",
    infoMessage: "",
    items: [],
    touched: false,
  });

  const getCurrentLocationHandler = useCallback(async (value?: string) => {
    try {
      if (value && isZNonEmptyString(value)) {
        setProcessing(() => true);
        const { errorMessage, infoMessage, items } = await autoComplete({
          input: value,
        });
        setProcessing(() => false);
        setAutoCompleteResult((oldValues) => ({
          ...oldValues,
          errorMessage,
          infoMessage,
          items,
          touched: true,
        }));

        if (processing) {
          setProcessing(() => false);
        }
      }
    } catch (error) {
      setProcessing(() => false);
      reportCustomError(error);
    }
  }, []);

  const handleSelect = (place: google.maps.places.Place) => {
    if (props?.onSelect) {
      props?.onSelect(place);
      setInput("");
      setAutoCompleteResult({
        errorMessage: "",
        infoMessage: "",
        items: [],
        touched: false,
      });
    }
  };

  return (
    <ZCard className="space-y-4">
      <ZHeading as={ZRUHeadingAsE.h5}>Search Place</ZHeading>
      <ZFlex align={ZRUAlignE.start} className="gap-2">
        <ZInput
          name="searchPlace"
          value={input}
          className="w-full"
          placeholder="Enter place name"
          disabled={props?.disabled}
          infoText={`Enter at least ${filedLimits.searchPlace.min} characters to search.`}
          isTouched={isZNonEmptyString(autoCompleteResult?.errorMessage)}
          errorMessage={autoCompleteResult?.errorMessage}
          onChange={({ target }) => {
            setInput(() => target?.value);
          }}
        />
        <ZButton
          type="button"
          loading={processing || props?.loading}
          disabled={
            processing ||
            props?.disabled ||
            input?.length < filedLimits.searchPlace.min
          }
          onClick={() => getCurrentLocationHandler(input)}
          className="mt-1"
        >
          <ZSearchLocationOutlineIcon className="w-5 h-5" />
          Search
        </ZButton>
      </ZFlex>
      {autoCompleteResult?.touched ? (
        <ZCard>
          {processing ? <ZSpinner className="mx-auto" size="3" /> : null}
          {!processing && isZNonEmptyString(autoCompleteResult?.infoMessage) ? (
            <ZBox className="text-center">
              <ZText color={ZRUColorE.gold}>
                {autoCompleteResult?.infoMessage}
              </ZText>
            </ZBox>
          ) : null}
          {!processing ? (
            <ZAccordingGroup type="multiple">
              {autoCompleteResult?.items?.map((el, index) => {
                return (
                  <React.Fragment key={index}>
                    <ZAccordionItem value={el?.id}>
                      <ZFlex
                        align={ZRUAlignE.center}
                        justify={ZRUJustifyE.between}
                        className="gap-4 p-2"
                      >
                        <ZBox className="flex-1">
                          <ZAccordionTrigger
                            className="text-sm text-left"
                            showIcon={false}
                          >
                            {el?.formattedAddress}
                          </ZAccordionTrigger>
                        </ZBox>

                        <ZButton size="1" onClick={() => handleSelect(el)}>
                          Select
                        </ZButton>
                      </ZFlex>
                      <ZAccordionContent>
                        <ZCard className="mb-3">
                          <ZDataList
                            dataList={[
                              {
                                label: "Country",
                                value:
                                  extractAddressDetails(el)?.[
                                    FormFieldsEnum.country
                                  ] ?? constants?.defaultValue?.fallbackValue,
                              },
                              {
                                label: "City",
                                value:
                                  extractAddressDetails(el)?.[
                                    FormFieldsEnum.city
                                  ] ?? constants?.defaultValue?.fallbackValue,
                              },
                              {
                                label: "apt suite",
                                value:
                                  extractAddressDetails(el)?.[
                                    FormFieldsEnum.aptSuit
                                  ] ?? constants?.defaultValue?.fallbackValue,
                              },
                              {
                                label: "Province",
                                value:
                                  extractAddressDetails(el)?.[
                                    FormFieldsEnum.province
                                  ] ?? constants?.defaultValue?.fallbackValue,
                              },
                              {
                                label: "Post code",
                                value:
                                  extractAddressDetails(el)?.[
                                    FormFieldsEnum.postCode
                                  ] ?? constants?.defaultValue?.fallbackValue,
                              },
                              {
                                label: "Street address",
                                value:
                                  extractAddressDetails(el)?.[
                                    FormFieldsEnum.streetAddress
                                  ] ?? constants?.defaultValue?.fallbackValue,
                              },
                            ]}
                          />
                        </ZCard>
                      </ZAccordionContent>
                    </ZAccordionItem>
                    {index < (autoCompleteResult?.items?.length ?? 0) - 1 && (
                      <ZSeparator className="w-full" />
                    )}
                  </React.Fragment>
                );
              })}
            </ZAccordingGroup>
          ) : null}
        </ZCard>
      ) : null}
    </ZCard>
  );
};

export default ZSearchPlace;
