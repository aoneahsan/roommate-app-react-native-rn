import React, { useRef, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { NavigationActions } from "react-navigation";

// import { NavigationContainer } from "@react-navigation/native";
import * as ACTIONS from "./../store/actions/index";
import SwitchNavigator from "./SwitchNavigator";

const Navigation = (props) => {
  const dispatch = useDispatch();
  const navRef = useRef();

  const isAuth = useSelector((state) => !!state.authR.token);

  useEffect(() => {
    console.log("Navigation Main Component == isAuth = ", isAuth);
    const checkAuthStatus = async () => {
      if (!isAuth) {
        await dispatch(ACTIONS.logout());
        navRef.current.dispatch(
          NavigationActions.navigate({ routeName: "Auth" })
        );
      }
    };
    checkAuthStatus();
  }, [isAuth]);

  return (
    // <NavigationContainer>
      <SwitchNavigator ref={navRef} />
    // </NavigationContainer>
  );
};

export default Navigation;
