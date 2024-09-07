// #region ---- Core Imports ----
import React, { useCallback, useMemo } from "react";

// #endregion

// #region ---- Packages Imports ----
import {
  showSuccessNotification,
  ZBadge,
  ZBox,
  ZButton,
  ZCard,
  ZContainer,
  ZErrorText,
  ZFlex,
  ZPage,
  ZPrizeInput,
  ZRCSelect,
  ZRUAlignE,
  ZRUColorE,
  ZSelect,
  ZText,
  ZTextArea,
} from "zaions-react-ui-kit";
import { ZodError } from "zod";
import { Form, Formik, FormikHelpers } from "formik";
import {
  isZNonEmptyString,
  ResponseCodeEnum,
  zStringify,
} from "zaions-tool-kit";
import { useNavigate } from "@tanstack/react-router";
import { useRecoilValue, useRecoilState } from "recoil";

// #endregion

// #region ---- Custom Imports ----
import NavigationHeader from "@/components/private/NavigationHeader";
import { AppRoutes } from "@/routes/appRoutes";
import constants from "@/utils/constants";
import { postingListStepOneValidationSchema } from "@/validationSchema";
import FormActionButtons from "@/components/form/FormActionButtons";
import ZBuildingTypeData from "@/data/buildingType";
import ZPlacePreferenceData from "@/data/placePreference";
import ZFrequenciesData from "@/data/frequencies";

// #endregion

// #region ---- Types Imports ----
import type { IPLStepOne } from "@/types/postingList";
import {
  frequencyEnum,
  ZRQGetRequestExtractEnum,
  ZRQUpdaterAction,
} from "@/types/generic";
import { FormFieldsEnum } from "@/utils/enums/formFieldsEnum";

// #endregion

// #region ---- Store Imports ----
import { formValidationRStateAtom } from "@/state/formState";
import { plStepOneRStateAtom } from "@/state/postingList";

// #endregion

// #region ---- Images Imports ----
import { ZAddIcon, ZArrowRightLongIcon, ZEditOutlineIcon } from "@/assets";
import { IApiResponse } from "zaions-react-tool-kit";
import { usePostRequest, useZUpdateRQCacheData } from "@/hooks/reactQuery";
import { MESSAGES } from "@/utils/messages";

// #endregion

const PLStepOne: React.FC = () => {
  const navigate = useNavigate();
  const formValidationRState = useRecoilValue(formValidationRStateAtom);
  const [plStepOneRState, setPlStepOneRState] =
    useRecoilState(plStepOneRStateAtom);
  const { updateRQCDataHandler } = useZUpdateRQCacheData();

  const initialValues = useMemo<IPLStepOne>(
    () => ({
      [FormFieldsEnum.title]: plStepOneRState?.[FormFieldsEnum.title] ?? "",
      [FormFieldsEnum.buildingType]:
        plStepOneRState?.[FormFieldsEnum.buildingType] ?? null,
      [FormFieldsEnum.location]:
        plStepOneRState?.[FormFieldsEnum.location] ?? null,
      [FormFieldsEnum.placePreference]:
        plStepOneRState?.[FormFieldsEnum.placePreference] ?? null,
      [FormFieldsEnum.rentFee]:
        plStepOneRState?.[FormFieldsEnum.rentFee] ?? undefined,
      [FormFieldsEnum.frequency]: frequencyEnum.monthly,
    }),
    [plStepOneRState]
  );

  // #region Apis Queries
  const { mutateAsync: postMutateAsync, isPending: isPostPending } =
    usePostRequest<IPLStepOne>({});
  // #endregion

  // #region Functions
  const formikValidation = useCallback((values: IPLStepOne) => {
    if (formValidationRState.frontendFormValidationIsEnabled) {
      try {
        postingListStepOneValidationSchema.parse(values);
      } catch (error) {
        if (error instanceof ZodError) {
          return error.formErrors.fieldErrors;
        }
      }
    }
  }, []);

  const handleSubmit = useCallback(
    async (
      values: IPLStepOne,
      { setErrors, resetForm }: FormikHelpers<IPLStepOne>
    ) => {
      const _data = {
        [FormFieldsEnum.title]: values?.[FormFieldsEnum.title],
        [FormFieldsEnum.buildingType]: values?.[FormFieldsEnum.buildingType],
        [FormFieldsEnum.placePreference]:
          values?.[FormFieldsEnum.placePreference],
        [FormFieldsEnum.rentFee]: values?.[FormFieldsEnum.rentFee],
        [FormFieldsEnum.location]: values?.[FormFieldsEnum.location],
        [FormFieldsEnum.frequency]: values?.[FormFieldsEnum.frequency],
      };

      try {
        // const _response = await postMutateAsync({
        //   apiPath,
        //   isAuthenticatedRequest: true,
        //   data: _data,
        //   itemId: selectedItem?.id,
        // });

        // if (_response?.status === ResponseStatusEnum.success) {
        updateRQCDataHandler({
          key: [],
          data: _data,
          extractType: ZRQGetRequestExtractEnum.extractData,
          updaterAction: ZRQUpdaterAction.add,
        });

        showSuccessNotification(MESSAGES.place.created);

        resetForm();
        // }
      } catch (error) {
        const _error = error as IApiResponse<IPLStepOne>;
        if (_error?.code === ResponseCodeEnum.badRequest) {
          const _errors = _error?.errors;
          if (_errors) {
            setErrors(_errors);
          }
        }
      }
    },
    []
  );
  // #endregion

  return (
    <ZPage>
      <NavigationHeader
        title="Posting List"
        afterBoxContent={
          <ZButton
            onClick={() => {
              navigate({
                to: AppRoutes.appSub.placesList.completePath,
              });
            }}
          >
            Cancel
          </ZButton>
        }
      />

      <Formik
        initialValues={initialValues}
        validate={formikValidation}
        enableReinitialize
        onSubmit={() => {
          navigate({
            to: AppRoutes?.postingListSub.stepTwo,
          });
        }}
      >
        {({
          values,
          touched,
          errors,
          handleBlur,
          handleChange,
          setFieldValue,
          setFieldTouched,
        }) => {
          return (
            <Form>
              <ZContainer size="4" className="mx-3 my-6">
                <ZBox className="space-y-6 mb-7">
                  <ZTextArea
                    required
                    rows={4}
                    label="Title"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    name={FormFieldsEnum.title}
                    placeholder="Maximum 50 words"
                    value={values?.[FormFieldsEnum.title]}
                    isTouched={touched?.[FormFieldsEnum.title]}
                    errorMessage={errors?.[FormFieldsEnum.title]}
                  />

                  <ZRCSelect
                    label="Building type"
                    onBlur={handleBlur}
                    options={ZBuildingTypeData}
                    name={FormFieldsEnum.buildingType}
                    placeholder="Select building type"
                    isTouched={touched?.[FormFieldsEnum.buildingType]}
                    errorMessage={errors?.[FormFieldsEnum.buildingType]}
                    value={ZBuildingTypeData?.find(
                      (el) =>
                        el?.value === values?.[FormFieldsEnum.buildingType]
                    )}
                    onChange={(selectedOption) => {
                      setFieldValue(
                        FormFieldsEnum.buildingType,
                        selectedOption?.value
                      );
                    }}
                  />

                  <ZCard>
                    <ZFlex className="gap-3 min900px:items-center max900px:flex-col">
                      <ZText>
                        Location
                        <ZText className="ms-1" color={ZRUColorE.tomato}>
                          *
                        </ZText>
                      </ZText>
                      <ZBadge
                        size="3"
                        color={ZRUColorE.lime}
                        className="text-wrap min900px:max-w-[60%]"
                      >
                        {isZNonEmptyString(
                          plStepOneRState?.location?.streetAddress
                        )
                          ? plStepOneRState?.location?.streetAddress
                          : constants?.defaultValue?.fallbackValue}
                      </ZBadge>
                      <ZButton
                        className="min900px:ms-auto"
                        color={ZRUColorE.iris}
                        onClick={() => {
                          setPlStepOneRState((prev) => ({
                            ...prev,
                            [FormFieldsEnum.title]:
                              values?.[FormFieldsEnum.title],
                            [FormFieldsEnum.buildingType]:
                              values?.[FormFieldsEnum.buildingType],
                            [FormFieldsEnum.placePreference]:
                              values?.[FormFieldsEnum.placePreference],
                            [FormFieldsEnum.rentFee]:
                              values?.[FormFieldsEnum.rentFee],
                            [FormFieldsEnum.location]:
                              values?.[FormFieldsEnum.location],
                            [FormFieldsEnum.frequency]:
                              values?.[FormFieldsEnum.frequency],
                          }));
                          navigate({
                            to: AppRoutes.postingListSub.selectLocation,
                          });
                        }}
                      >
                        {isZNonEmptyString(
                          plStepOneRState?.location?.formattedAddress
                        ) ? (
                          <>
                            <ZEditOutlineIcon className="w-5 h-5" /> Edit
                          </>
                        ) : (
                          <>
                            <ZAddIcon className="w-5 h-5" /> Add
                          </>
                        )}
                      </ZButton>
                    </ZFlex>
                  </ZCard>
                  <ZErrorText
                    show={touched?.[FormFieldsEnum.location] ?? false}
                    message={errors?.[FormFieldsEnum.location]}
                  />

                  <ZRCSelect
                    label="Place"
                    onBlur={handleBlur}
                    placeholder="Select place"
                    options={ZPlacePreferenceData}
                    name={FormFieldsEnum.placePreference}
                    isTouched={touched?.[FormFieldsEnum.placePreference]}
                    errorMessage={errors?.[FormFieldsEnum.placePreference]}
                    value={ZPlacePreferenceData?.find(
                      (el) =>
                        el?.value === values?.[FormFieldsEnum.placePreference]
                    )}
                    onChange={(selectedOption) => {
                      setFieldValue(
                        FormFieldsEnum.placePreference,
                        selectedOption?.value
                      );
                    }}
                  />

                  <ZFlex
                    align={ZRUAlignE.start}
                    className="gap-3 maxSm:flex-col"
                  >
                    <ZPrizeInput
                      required
                      className="w-full"
                      label="Rent fee"
                      errorMessage={errors?.[FormFieldsEnum.rentFee]}
                      value={values?.[FormFieldsEnum.rentFee] ?? undefined}
                      isTouched={touched?.[FormFieldsEnum.rentFee]}
                      selectClassName="sm:w-1/4 w-full"
                      inputClassName="maxSm:w-full"
                      onBlur={() =>
                        setFieldTouched(FormFieldsEnum.rentFee, true)
                      }
                      onChange={(selectedOption) => {
                        setFieldValue(FormFieldsEnum.rentFee, selectedOption);
                      }}
                    />

                    <ZSelect
                      required
                      label="Frequency"
                      className="*:w-full maxSm:w-full"
                      options={ZFrequenciesData}
                      name={FormFieldsEnum.frequency}
                      value={values?.[FormFieldsEnum.frequency]}
                      isTouched={touched?.[FormFieldsEnum.frequency]}
                      errorMessage={errors?.[FormFieldsEnum.frequency]}
                      onOpenChange={(val) => {
                        if (!touched[FormFieldsEnum.frequency]) {
                          setFieldTouched(FormFieldsEnum.frequency, val);
                        }
                      }}
                      onValueChange={(val) => {
                        setFieldValue(FormFieldsEnum.frequency, val);
                      }}
                    />
                  </ZFlex>
                </ZBox>
                <FormActionButtons
                  showResetButton={false}
                  submitButtonContent={
                    <>
                      Save & Continue <ZArrowRightLongIcon className="mt-px" />
                    </>
                  }
                />
              </ZContainer>
            </Form>
          );
        }}
      </Formik>
    </ZPage>
  );
};

export default PLStepOne;
