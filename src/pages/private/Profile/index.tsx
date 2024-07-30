// #region ---- Core Imports ----
import React, { useMemo } from "react";

// #endregion

// #region ---- Packages Imports ----
import { Form, Formik } from "formik";
import {
  ZAvatar,
  ZBox,
  ZButton,
  ZCard,
  ZContainer,
  ZFlex,
  ZInput,
  ZPage,
  ZRUAlignE,
  ZRUDirectionE,
  ZRURadiusE,
  ZSelect,
  ZText,
} from "zaions-react-ui-kit";

// #endregion

// #region ---- Custom Imports ----
import ZAgesData from "@/data/ages";
import ZGenderData from "@/data/gender";
import ZConstellationsData from "@/data/constellations";
import ZCitiesData from "@/data/cities";
import ZLanguagesData from "@/data/languages";
import NavigationHeader from "@/components/private/NavigationHeader";

// #endregion

// #region ---- Types Imports ----

// #endregion

// #region ---- Store Imports ----

// #endregion

// #region ---- Images Imports ----
import { ZAddIcon, ZArrowRightLongIcon, ZAvatarImage } from "@/assets";
import ZRCSelect from "@/components/ZRCSelect";

// #endregion

const Profile: React.FC = () => {
  const initialValues = useMemo(() => ({}), []);

  return (
    <ZPage>
      <NavigationHeader title="My Profile" />

      <Formik initialValues={initialValues} onSubmit={() => {}}>
        {({ handleChange, handleBlur }) => {
          return (
            <Form>
              <ZContainer size="4" className="my-6 maxLg:mx-3">
                <ZFlex
                  align={ZRUAlignE.start}
                  className="max900px:gap-5 min900px:gap-3 max900px:flex-col-reverse lg:gap-6"
                >
                  <ZCard className="*:w-full space-y-3 p-5 max900px:!w-full maxLg:w-[60%] lg:w-1/2">
                    <ZInput
                      label="Name"
                      name="name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />

                    <ZRCSelect
                      label="Age"
                      name="age"
                      options={ZAgesData}
                      placeholder="Select Your Age"
                    />

                    <ZRCSelect
                      label="Gender"
                      name="gender"
                      options={ZGenderData}
                      placeholder="Select Your Gender"
                    />

                    <ZRCSelect
                      label="Constellations"
                      name="constellations"
                      options={ZConstellationsData}
                      placeholder="Select Your Constellations"
                    />

                    <ZRCSelect
                      label="Hometown"
                      name="hometown"
                      options={ZConstellationsData}
                      placeholder="Select Your Hometown"
                    />

                    <ZRCSelect
                      label="Language"
                      name="language"
                      options={ZConstellationsData}
                      placeholder="Select Your Language"
                    />
                  </ZCard>

                  <ZFlex
                    align={ZRUAlignE.center}
                    direction={ZRUDirectionE.column}
                    className="maxLg:w-[40%] max900px:!w-full lg:w-1/2"
                  >
                    <ZFlex
                      align={ZRUAlignE.center}
                      direction={ZRUDirectionE.column}
                    >
                      <ZAvatar
                        className="*:items-end *:overflow-hidden text-center"
                        size="8"
                        fallback={
                          <img
                            src={ZAvatarImage}
                            className="object-cover h-full"
                          />
                        }
                      />
                      <ZButton className="mt-2">Upload profile picture</ZButton>
                    </ZFlex>

                    <ZBox className="mt-7">
                      <ZText className="block mb-3 lg:ms-10 max900px:text-center">
                        Upload Photo (1/9)
                      </ZText>

                      <ZFlex
                        className="flex-wrap justify-center w-auto gap-y-4 gap-x-2"
                        align={ZRUAlignE.center}
                      >
                        {[...Array(8)].map((el) => (
                          <ZBox className="lg:w-[20%]">
                            <ZAvatar
                              key={el}
                              size="6"
                              fallback={<ZAddIcon className="w-5 h-5" />}
                              radius={ZRURadiusE.medium}
                              className="cursor-pointer"
                            />
                          </ZBox>
                        ))}
                      </ZFlex>
                    </ZBox>
                  </ZFlex>
                </ZFlex>
                <ZButton className="mt-6 max900px:w-full">
                  Save & Continue <ZArrowRightLongIcon className="mt-px" />
                </ZButton>
              </ZContainer>
            </Form>
          );
        }}
      </Formik>
    </ZPage>
  );
};

export default Profile;
