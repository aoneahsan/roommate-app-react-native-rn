// #region ---- Core Imports ----
import React from "react";

// #endregion

// #region ---- Packages Imports ----
import { useRecoilValue } from "recoil";
import {
  showErrorNotification,
  ZBox,
  ZButton,
  ZCallout,
  ZCard,
  ZFileDropUploader,
  ZFlex,
  ZHeading,
  ZRUHeadingAsE,
} from "zaions-react-ui-kit";
import { FieldArray, useFormikContext } from "formik";

// #endregion

// #region ---- Custom Imports ----
import { fileValidation } from "@/utils/helpers";
import ImageSwiper from "../ImageSwiper";

// #endregion

// #region ---- Store Imports ----
import { fileSettingRStateAtom } from "@/state/formState";

// #endregion

// #region ---- Images Imports ----
import { ZAddIcon } from "@/assets";

// #endregion

// #region ---- Types Imports ----
import { fileErrorEnum } from "@/types/generic";

interface ImageUploadSectionProps {
  sectionTitle: string;
  fieldName: string;
}

// #endregion

const ImageUploadSection: React.FC<ImageUploadSectionProps> = ({
  sectionTitle,
  fieldName,
}) => {
  const { values } = useFormikContext<any>();
  const fileSettingRState = useRecoilValue(fileSettingRStateAtom);

  return (
    <ZCard>
      <FieldArray name={fieldName}>
        {({ push, remove }) => (
          <>
            <ZFlex>
              <ZHeading as={ZRUHeadingAsE.h6} className="text-xl font-medium">
                {sectionTitle}
              </ZHeading>
              <ZFileDropUploader
                validator={(file) =>
                  fileValidation({ file, maxFileSize: fileSettingRState?.size })
                }
                onChange={async ({
                  acceptedFiles,
                  fileRejections,
                  localUrl,
                }) => {
                  const file = acceptedFiles?.[0];

                  if (file) {
                    push(localUrl);
                  }

                  if (fileRejections?.length) {
                    const { message, code } = fileRejections[0].errors[0];

                    if (code === fileErrorEnum.sizeTooLarge) {
                      showErrorNotification(message);
                    }
                  }
                }}
                className="ms-auto w-max h-max"
              >
                <ZButton>
                  <ZAddIcon className="w-5 h-5" /> Add
                </ZButton>
              </ZFileDropUploader>
            </ZFlex>
            {(values?.[fieldName]?.length ?? 0) > 0 ? (
              <ZBox className="mt-3">
                <ImageSwiper
                  images={values[fieldName]}
                  onRemove={remove}
                  sectionTitle={sectionTitle}
                />
              </ZBox>
            ) : (
              <ZBox className="mt-4">
                <ZCallout
                  content="No Image is uploaded yet."
                  className="flex items-center justify-center"
                  showIcon={false}
                />
              </ZBox>
            )}
          </>
        )}
      </FieldArray>
    </ZCard>
  );
};

export default ImageUploadSection;
