// #region ---- Core Imports ----
import React, { useMemo, useState } from "react";

// #endregion

// #region ---- Packages Imports ----
import {
  ZBox,
  ZButton,
  ZContainer,
  ZPage,
  ZRUVariantE,
  ZTextArea,
} from "zaions-react-ui-kit";
import { Form, Formik } from "formik";

// #endregion

// #region ---- Custom Imports ----
import NavigationHeader from "@/components/private/NavigationHeader";
import ZMusicData from "@/data/music";
import ZMoviesData from "@/data/movie";
import ZTravelData from "@/data/travel";
import ZBooksData from "@/data/books";
import ZGymData from "@/data/Gym";
import ZFoodsData from "@/data/Foods";
import { ZArrowRightLongIcon } from "@/assets";
import { EHobbyType } from "@/types/hobbies";
import CustomHobbyModal from "@/components/Hobbies/CustomHobbyModal";
import ZRCSelect from "@/components/ZRCSelect";

// #endregion

// #region ---- Types Imports ----

// #endregion

// #region ---- Store Imports ----

// #endregion

// #region ---- Images Imports ----

// #endregion

const Hobbies: React.FC = () => {
  const [compState, setCompState] = useState<{
    showCustomHobbyModal: boolean;
    type?: EHobbyType;
  }>({ showCustomHobbyModal: false });

  const initialValues = useMemo(() => ({}), []);

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
      name: "music",
    },
    {
      label: "Movie",
      options: ZMoviesData,
      showLabelBtn: true,
      placeholder: "Select movie",
      labelBtnText: "Add custom movie",
      type: EHobbyType.movie,
      name: "movie",
    },
    {
      label: "Travel",
      options: ZTravelData,
      showLabelBtn: true,
      placeholder: "Select travel",
      labelBtnText: "Add custom travel",
      type: EHobbyType.travel,
      name: "travel",
    },
    {
      label: "Book",
      options: ZBooksData,
      showLabelBtn: true,
      placeholder: "Select book",
      labelBtnText: "Add custom book",
      type: EHobbyType.book,
      name: "book",
    },
    {
      label: "Gym",
      options: ZGymData,
      showLabelBtn: true,
      placeholder: "Select gym",
      labelBtnText: "Add custom gym",
      type: EHobbyType.gym,
      name: "gym",
    },
    {
      label: "Food",
      options: ZFoodsData,
      showLabelBtn: true,
      placeholder: "Select food",
      labelBtnText: "Add custom food",
      type: EHobbyType.food,
      name: "food",
    },
  ];

  return (
    <ZPage>
      <NavigationHeader title="Hobbies" />

      <Formik initialValues={initialValues} onSubmit={() => {}}>
        {() => {
          return (
            <Form>
              <ZContainer size="4" className="my-6 maxLg:mx-3">
                <ZBox className="*:w-full space-y-4 py-5">
                  <ZTextArea
                    label="About Me"
                    placeholder="Maximum 250 words"
                    rows={6}
                  />

                  {hobbies?.map((el, index) => {
                    return (
                      <ZRCSelect
                        showLabelBtn
                        isMulti
                        key={index}
                        label={el?.label}
                        options={el?.options}
                        placeholder={el?.placeholder}
                        labelBtnProps={{
                          children: el?.labelBtnText,
                          variant: ZRUVariantE.ghost,
                          onClick: () => showCustomHobbyModal(el?.type),
                        }}
                      />
                    );
                  })}
                </ZBox>
                <ZButton className="mt-6 max900px:w-full">
                  Save & Continue <ZArrowRightLongIcon className="mt-px" />
                </ZButton>
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
