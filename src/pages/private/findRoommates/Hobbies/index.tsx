// #region ---- Core Imports ----
import React, { useMemo, useState } from "react";

// #endregion

// #region ---- Packages Imports ----
import {
  ZBox,
  ZButton,
  ZContainer,
  ZFlex,
  ZPage,
  ZRCSelect,
  ZRUColorE,
  ZRUVariantE,
  ZTextArea,
} from "zaions-react-ui-kit";
import { Form, Formik } from "formik";
import { useNavigate } from "@tanstack/react-router";

// #endregion

// #region ---- Custom Imports ----
import NavigationHeader from "@/components/private/NavigationHeader";
import CustomHobbyModal from "@/components/Hobbies/CustomHobbyModal";
import FormActionButtons from "@/components/form/FormActionButtons";
import { AppRoutes } from "@/routes/appRoutes";
import ZMusicData from "@/data/music";
import ZMoviesData from "@/data/movie";
import ZTravelData from "@/data/travel";
import ZBooksData from "@/data/books";
import ZGymData from "@/data/Gym";
import ZFoodsData from "@/data/Foods";

// #endregion

// #region ---- Types Imports ----
import { EHobbyType, IHobby } from "@/types/hobby";

// #endregion

// #region ---- Store Imports ----

// #endregion

// #region ---- Images Imports ----
import { ZArrowLeftLongIcon, ZArrowRightLongIcon } from "@/assets";
import { FormFieldsEnum } from "@/utils/enums/formFieldsEnum";

// #endregion

const Hobbies: React.FC = () => {
  const navigate = useNavigate();
  const [compState, setCompState] = useState<{
    showCustomHobbyModal: boolean;
    type?: EHobbyType;
  }>({ showCustomHobbyModal: false });

  const initialValues = useMemo<IHobby>(
    () => ({
      [FormFieldsEnum.aboutMe]: "",
      [FormFieldsEnum.music]: [],
      [FormFieldsEnum.movie]: [],
      [FormFieldsEnum.travel]: [],
      [FormFieldsEnum.book]: [],
      [FormFieldsEnum.gym]: [],
      [FormFieldsEnum.food]: [],
    }),
    []
  );

  const showCustomHobbyModal = (type: EHobbyType) => {
    setCompState((oldValues) => ({
      ...oldValues,
      showCustomHobbyModal: true,
      type,
    }));
  };

  const hobbies = [
    {
      label: "Music",
      options: ZMusicData,
      showLabelBtn: true,
      placeholder: "Select music",
      labelBtnText: "Add custom music",
      type: EHobbyType.music,
      name: FormFieldsEnum.music,
    },
    {
      label: "Movie",
      options: ZMoviesData,
      showLabelBtn: true,
      placeholder: "Select movie",
      labelBtnText: "Add custom movie",
      type: EHobbyType.movie,
      name: FormFieldsEnum.movie,
    },
    {
      label: "Travel",
      options: ZTravelData,
      showLabelBtn: true,
      placeholder: "Select travel",
      labelBtnText: "Add custom travel",
      type: EHobbyType.travel,
      name: FormFieldsEnum.travel,
    },
    {
      label: "Book",
      options: ZBooksData,
      showLabelBtn: true,
      placeholder: "Select book",
      labelBtnText: "Add custom book",
      type: EHobbyType.book,
      name: FormFieldsEnum.book,
    },
    {
      label: "Gym",
      options: ZGymData,
      showLabelBtn: true,
      placeholder: "Select gym",
      labelBtnText: "Add custom gym",
      type: EHobbyType.gym,
      name: FormFieldsEnum.gym,
    },
    {
      label: "Food",
      options: ZFoodsData,
      showLabelBtn: true,
      placeholder: "Select food",
      labelBtnText: "Add custom food",
      type: EHobbyType.food,
      name: FormFieldsEnum.food,
    },
  ] as const;

  return (
    <ZPage>
      <NavigationHeader
        title="Hobbies"
        beforeBoxContent={
          <>
            <ZButton
              onClick={() => {
                navigate({
                  to: AppRoutes.roomPreference,
                });
              }}
            >
              <ZArrowLeftLongIcon /> Go Back
            </ZButton>
          </>
        }
      />

      <Formik
        initialValues={initialValues}
        onSubmit={() => {
          navigate({
            to: AppRoutes.myLifeStyle,
          });
        }}
      >
        {({
          dirty,
          values,
          touched,
          errors,
          setFieldValue,
          handleBlur,
          handleChange,
        }) => {
          return (
            <Form>
              <ZContainer size="4" className="my-6 maxLg:mx-3">
                <ZBox className="*:w-full space-y-4 py-5">
                  <ZTextArea
                    label="About Me"
                    placeholder="Maximum 250 words"
                    rows={6}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    name={FormFieldsEnum.aboutMe}
                    value={values?.[FormFieldsEnum.aboutMe]}
                    isTouched={touched?.[FormFieldsEnum.aboutMe]}
                    errorMessage={errors?.[FormFieldsEnum.aboutMe]}
                  />

                  {hobbies?.map((el, index) => {
                    return (
                      <ZRCSelect
                        showLabelBtn
                        isMulti
                        key={index}
                        label={el?.label}
                        name={el?.name}
                        options={el?.options}
                        placeholder={el?.placeholder}
                        onBlur={handleBlur}
                        isTouched={touched?.[el?.name]}
                        errorMessage={errors?.[el?.name]}
                        onChange={(value) => {
                          setFieldValue(el?.name, value);
                        }}
                        labelBtnProps={{
                          children: el?.labelBtnText,
                          variant: ZRUVariantE.ghost,
                          onClick: () => showCustomHobbyModal(el?.type),
                        }}
                      />
                    );
                  })}
                </ZBox>
                <ZFlex className="maxMd:flex-col md:justify-between md:items-center">
                  <FormActionButtons
                    showResetButton={false}
                    disabledSubmitBtn={!dirty}
                    submitButtonContent={
                      <>
                        Save & Continue{" "}
                        <ZArrowRightLongIcon className="mt-px" />
                      </>
                    }
                  />

                  <ZButton
                    color={ZRUColorE.iris}
                    type="button"
                    className="maxMd:w-full"
                    onClick={() => {
                      navigate({
                        to: AppRoutes.myLifeStyle,
                      });
                    }}
                  >
                    Skip
                  </ZButton>
                </ZFlex>
              </ZContainer>
            </Form>
          );
        }}
      </Formik>

      <CustomHobbyModal
        open={compState?.showCustomHobbyModal}
        type={compState?.type}
        closeModalHandler={() => {
          setCompState((oldValues) => ({
            ...oldValues,
            showCustomHobbyModal: false,
          }));
        }}
      />
    </ZPage>
  );
};

export default Hobbies;
