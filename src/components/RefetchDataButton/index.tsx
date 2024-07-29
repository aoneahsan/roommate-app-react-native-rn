import { ZButton, ZFlex, ZRUAlignE, ZRUJustifyE } from "zaions-react-ui-kit";

interface IRefetchDataButtonProps {
  onClick: () => void;
  refetchButtonText?: string;
}

const RefetchDataButton: React.FC<IRefetchDataButtonProps> = ({
  onClick,
  refetchButtonText = "Refetch Data",
}) => {
  return (
    <ZFlex
      justify={ZRUJustifyE.end}
      align={ZRUAlignE.center}
      className="container"
    >
      <ZButton onClick={onClick} className="w-full">
        {refetchButtonText}
      </ZButton>
    </ZFlex>
  );
};

export default RefetchDataButton;
