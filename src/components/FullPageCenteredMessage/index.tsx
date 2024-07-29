import { AppRoutes } from "@/routes/appRoutes";
import { useNavigate } from "@tanstack/react-router";
import {
  ZButton,
  ZFlex,
  ZHeading,
  ZRUAlignE,
  ZRUDirectionE,
  ZRUGeneralAlignE,
  ZRUJustifyE,
} from "zaions-react-ui-kit";

interface IFullPageCenteredMessageProps {
  message: string;
  showGoToHomeButton?: boolean;
}

const FullPageCenteredMessage: React.FC<IFullPageCenteredMessageProps> = ({
  message,
  showGoToHomeButton = true,
}) => {
  const navigate = useNavigate();

  const navigateBackToHome = () => {
    navigate({
      to: AppRoutes.home,
    });
  };

  return (
    <ZFlex
      minHeight="68vh"
      justify={ZRUJustifyE.center}
      align={ZRUAlignE.center}
      direction={ZRUDirectionE.column}
    >
      <ZHeading align={ZRUGeneralAlignE.center}>{message}</ZHeading>
      {showGoToHomeButton ? (
        <ZButton onClick={navigateBackToHome} mt="4">
          Go Back Home
        </ZButton>
      ) : null}
    </ZFlex>
  );
};
export default FullPageCenteredMessage;
