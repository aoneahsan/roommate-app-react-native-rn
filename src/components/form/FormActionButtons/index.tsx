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
  submitButtonContent?: React.ReactNode;
  onResetClicked?: () => void;
  processing?: boolean;
  mode?: ZFormModeE;
  disabledSubmitBtn?: boolean;
  disabledResetBtn?: boolean;
}
const FormActionButtons: React.FC<IFormActionButtonsProps> = ({
  resetButtonText,
  showResetButton = true,
  showSubmitButton = true,
  submitButtonContent = "Submit",
  onResetClicked,
  processing,
  mode = ZFormModeE.add,
  disabledSubmitBtn = false,
  disabledResetBtn = false,
}) => {
  const { dirty } = useFormikContext();
  return (
    <ZBox className="mb-3">
      <ZFlex justify={ZRUJustifyE.between} className="gap-3 maxSm:flex-col">
        {showResetButton ? (
          <ZButton
            type={!!onResetClicked ? "button" : "reset"}
            color={ZRUColorE.red}
            disabled={disabledResetBtn || processing || !dirty}
            onClick={onResetClicked}
          >
            {resetButtonText ?? "Reset"}
          </ZButton>
        ) : null}
        {showSubmitButton ? (
          <ZButton
            type="submit"
            disabled={
              disabledSubmitBtn ||
              processing ||
              (mode === ZFormModeE.edit && !dirty)
            }
            loading={processing}
          >
            {submitButtonContent}
          </ZButton>
        ) : null}
      </ZFlex>
    </ZBox>
  );
};

export default FormActionButtons;
