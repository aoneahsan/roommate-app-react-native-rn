// Core Imports
import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView, Dimensions } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Carousel from "react-native-snap-carousel";

// Custom Imports
import * as CONFIG from "../../config";
import * as ACTIONS from "./../../store/actions";
import UsersListPageHeader from "../../components/UsersListPageHeader";
import UserListItem from "../../components/UserListItem";
import UserListFiltersModal from "../../components/UserListFiltersModal";

// Image
import AvatarLarge from "./../../../assets/images/avatar-large.png";

// ****************************************************************

const DEVICE_WIDTH = Dimensions.get("window").width;
const DEVICE_HEIGHT = Dimensions.get("window").height;

const UsersList = (props) => {
  const dispatch = useDispatch();

  const [showFiltersModal, setShowFiltersModal] = useState(false);
  const carouselData = [
    {
      id: 1,
      info: {
        name: "Gigi",
        gender: "Female",
        occupation: "Student",
        budget: {
          min: 700,
          max: 1200,
        },
      },
      percentage: "20",
      imageBgColor: "#5D00B5",
      badgeBgColor: "#5D0000",
      badgetext: "PikeMe",
      progress: 15,
      image: AvatarLarge,
    },
    {
      id: 1,
      info: {
        name: "Gigi",
        gender: "Female",
        occupation: "Student",
        budget: {
          min: 700,
          max: 1200,
        },
      },
      percentage: "20",
      imageBgColor: "#5DB1D5",
      badgeBgColor: "#5DB100",
      badgetext: "PikeMe",
      progress: 15,
      image: AvatarLarge,
    },
    {
      id: 1,
      info: {
        name: "Gigi",
        gender: "Female",
        occupation: "Student",
        budget: {
          min: 700,
          max: 1200,
        },
      },
      percentage: "20",
      imageBgColor: "#B1D005",
      badgeBgColor: "#000",
      badgetext: "PikeMe",
      progress: 15,
      image: AvatarLarge,
    },
    {
      id: 1,
      info: {
        name: "Gigi",
        gender: "Female",
        occupation: "Student",
        budget: {
          min: 700,
          max: 1200,
        },
      },
      percentage: "20",
      imageBgColor: "#a10Da5",
      badgeBgColor: "#a10D00",
      badgetext: "PikeMe",
      progress: 15,
      image: AvatarLarge,
    },
  ];

  useEffect(() => {
    dispatch(ACTIONS.setIsLoadingFalse());
  }, []);

  const changeFiltersModalVisibility = (status) => {
    setShowFiltersModal(status);
  };

  const openUserDetailPage = (user) => {
    props.navigation.navigate({ name: "users_list_item_detail_screen" });
  };

  const onCarouselConLayout = (event) => {
    const cardLayout = event.nativeEvent.layout;
    const { height } = cardLayout;
    // console.log("UsersList === onCarouselConLayout == res = ", {
    //   height,
    //   cardLayout,
    // });
  };

  return (
    <ScrollView contentContainerStyle={STYLES.bgWhite}>
      <View style={STYLES.main}>
        <UsersListPageHeader
          onFilterClick={() => changeFiltersModalVisibility(true)}
        ></UsersListPageHeader>
        <View style={STYLES.carouselCon} onLayout={onCarouselConLayout}>
          <Carousel
            sliderWidth={DEVICE_WIDTH}
            itemWidth={DEVICE_WIDTH - 80}
            renderItem={UserListItem}
            data={carouselData}
            firstItem={1}
            layout={"default"}
            onTouchStart={openUserDetailPage}
            containerCustomStyle={STYLES.carousel}
          />
        </View>
      </View>
      {showFiltersModal && (
        <UserListFiltersModal
          closemodal={() => changeFiltersModalVisibility(false)}
          visible={showFiltersModal}
        ></UserListFiltersModal>
      )}
    </ScrollView>
  );
};

const STYLES = StyleSheet.create({
  bgWhite: {
    backgroundColor: CONFIG.WHITE,
    flexGrow: 1,
  },
  main: {
    flex: 1,
  },
  carouselCon: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  carousel: {
    height: "80%",
  },
});

export default UsersList;
