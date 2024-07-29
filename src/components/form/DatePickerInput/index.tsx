import { useFormikContext } from "formik";
import DatePicker from "react-datepicker";
import dayjs from "dayjs";
import "./styles.css";
import { useResponsiveScales } from "@/hooks/reactResponsive";
import { ZFlex, ZRUColorE, ZRUDirectionE, ZText } from "zaions-react-ui-kit";

interface IDatePickerInputProps {
  value?: string | Date | null;
  inputName: string;
  placeholder: string;
  minDate?: Date;
  maxDate?: Date;
  errorMessage?: string;
  isTouched?: boolean;
}

const DatePickerInput: React.FC<IDatePickerInputProps> = ({
  value,
  inputName,
  placeholder,
  minDate,
  maxDate,
  errorMessage,
  isTouched,
}) => {
  const { isMobile } = useResponsiveScales();
  const { setFieldValue, handleBlur } = useFormikContext<any>();

  return (
    <ZFlex
      direction={ZRUDirectionE.column}
      mb="3"
      width={isMobile ? "100%" : "200px"}
    >
      <DatePicker
        selected={value ? new Date(value) : null}
        onChange={(date) => {
          if (date) {
            const formattedDate = dayjs(date).format("YYYY-MM-DD");
            setFieldValue(inputName, formattedDate, true);
          }
        }}
        onBlur={handleBlur}
        name={inputName}
        className="date-picker"
        placeholderText={placeholder}
        minDate={minDate}
        maxDate={maxDate}
      />
      {isTouched && errorMessage ? (
        <ZText color={ZRUColorE.red} size="1" ml="1" mt="1">
          {errorMessage}
        </ZText>
      ) : null}
    </ZFlex>
  );
};

export default DatePickerInput;
