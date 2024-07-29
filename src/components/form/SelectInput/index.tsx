import { useResponsiveScales } from "@/hooks/reactResponsive";
import { useFormikContext } from "formik";
import ReactSelect from "react-select";
import {
  ISelectOption,
  ZFlex,
  ZRUColorE,
  ZRUDirectionE,
  ZText,
} from "zaions-react-ui-kit";

interface ISelectInputProps {
  value?: string;
  inputName: string;
  placeholder: string;
  errorMessage?: string;
  isTouched?: boolean;
  options: ISelectOption[];
  isMulti?: boolean;
  disabled?: boolean;
}

const SelectInput: React.FC<ISelectInputProps> = ({
  value,
  inputName,
  placeholder,
  errorMessage,
  isTouched,
  options,
  isMulti,
  disabled,
}) => {
  const { isMobile } = useResponsiveScales();
  const { setFieldValue, handleBlur } = useFormikContext<any>();

  if (options?.length <= 0) {
    return null;
  }

  return (
    <ZFlex direction={ZRUDirectionE.column} mb="3">
      <ReactSelect
        name={inputName}
        isDisabled={disabled}
        value={
          value
            ? isMulti
              ? value.split(",").map((el) => ({ label: el, value: el }))
              : { label: value, value }
            : null
        }
        placeholder={placeholder}
        options={options ?? []}
        onBlur={handleBlur}
        onChange={(val) => {
          if (
            (!isMulti && val) ||
            (isMulti && (val as unknown as ISelectOption[]).length > 0)
          ) {
            let _val;
            if (isMulti) {
              _val = (val as unknown as ISelectOption[])
                .map((el) => el.value)
                .join(",");
            } else {
              _val = (val as unknown as ISelectOption).value;
            }

            if (_val) {
              setFieldValue(inputName, _val, true);
            }
          } else {
            setFieldValue(inputName, undefined, true);
          }
        }}
        className={isMobile ? "" : "input-width"}
        isClearable
        isMulti={isMulti}
        isSearchable
      />
      {isTouched && errorMessage ? (
        <ZText color={ZRUColorE.red} size="1" ml="1" mt="1">
          {errorMessage}
        </ZText>
      ) : null}
    </ZFlex>
  );
};

export default SelectInput;
