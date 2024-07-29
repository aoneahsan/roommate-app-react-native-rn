import { ZFormModeE } from "@/types/generic";
import { useFormikContext } from "formik";
import {
  ZBox,
  ZButton,
  ZFlex,
  ZRUColorE,
  ZRUJustifyE,
} from "zaions-react-ui-kit";

interface IFormActionButtonsProps {
  showResetButton?: boolean;
  showSubmitButton?: boolean;
  resetButtonText?: string;
  submitButtonText?: string;
  onResetClicked?: () => void;
  processing?: boolean;
  mode?: ZFormModeE;
}
const FormActionButtons: React.FC<IFormActionButtonsProps> = ({
  resetButtonText,
  showResetButton = true,
  showSubmitButton = true,
  submitButtonText,
  onResetClicked,
  processing,
  mode = ZFormModeE.add,
}) => {
  const { dirty, isValid } = useFormikContext();
  return (
    <ZBox className="mb-3">
      <ZFlex justify={ZRUJustifyE.between}>
        {showResetButton ? (
          <ZButton
            type={!!onResetClicked ? "button" : "reset"}
            color={ZRUColorE.red}
            disabled={processing || (onResetClicked ? false : !dirty)}
            mr="4"
            onClick={onResetClicked}
          >
            {resetButtonText ?? "Reset"}
          </ZButton>
        ) : null}
        {showSubmitButton ? (
          <ZButton
            type="submit"
            disabled={
              !isValid || processing || (mode === ZFormModeE.edit && !dirty)
            }
            loading={processing}
          >
            {submitButtonText ?? "Submit"}
          </ZButton>
        ) : null}
      </ZFlex>
    </ZBox>
  );
};

export default FormActionButtons;
