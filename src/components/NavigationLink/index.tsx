import { useResponsiveScales } from "@/hooks/reactResponsive";
import { userIsAuthenticatedRStateSelector } from "@/state/user";
import { AppRoutes } from "@/routes/appRoutes";
import { matchRoutes, useLocation } from "react-router";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { ZButton, ZRUColorE } from "zaions-react-ui-kit";

interface INavigationLinkProps {
  path: string;
  isAuthenticated: boolean;
  label: string;
}

const NavigationLink: React.FC<INavigationLinkProps> = ({
  isAuthenticated,
  label,
  path,
}) => {
  const { isMobile, isTablet } = useResponsiveScales();
  const location = useLocation();
  const userIsAuthenticatedRState = useRecoilValue(
    userIsAuthenticatedRStateSelector
  );
  const routesMatch = matchRoutes(
    [
      { path: AppRoutes.home },
      { path: AppRoutes.myAccount },
      { path: AppRoutes.login },
      { path: AppRoutes.register },
    ],
    location
  );

  const currentActiveRoute = routesMatch && routesMatch[0].pathname;
  const isCurrentPathActive = currentActiveRoute === path;

  if (
    (!userIsAuthenticatedRState && isAuthenticated) ||
    (userIsAuthenticatedRState && !isAuthenticated)
  ) {
    return null;
  } else {
    return (
      <ZButton
        size={isTablet ? "3" : "2"}
        mr="2"
        color={isCurrentPathActive ? ZRUColorE.teal : undefined}
        asChild
        mb={isMobile ? "2" : "0"}
      >
        <Link to={path}>{label}</Link>
      </ZButton>
    );
  }
};
export default NavigationLink;
