// Core Imports
import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView, Dimensions, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Carousel from "react-native-snap-carousel";
import { useFocusEffect } from "@react-navigation/native";

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

const BG_COLORS = [
  "#5D00B5",
  "#5D0000",
  "#5DB1D5",
  "#5DB100",
  "#B1D005",
  "#000",
  "#a10Da5",
  "#a10D00",
  "#0B01D5",
  "#0a01a0",
  "#005",
];

const UsersList = (props) => {
  const dispatch = useDispatch();

  const [showFiltersModal, setShowFiltersModal] = useState(false);
  const usersList = useSelector((store) => store.userR.usersList);
  const [carouselData, setCarouselData] = useState([
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
      imageBgColor: BG_COLORS[Math.floor(Math.random() * BG_COLORS.length)],
      badgeBgColor: BG_COLORS[Math.floor(Math.random() * BG_COLORS.length)],
      badgetext: "PikeMe",
      progress: 15,
      image: AvatarLarge,
    },
  ]);

  useEffect(() => {
    (async function () {
      // console.log("UsersList === useEffect == usersList = ", { usersList });
      if (usersList) {
        let newCarouselData = await usersList.map((el) => {
          const profileImage = el.userProfileImages
            ? el.userProfileImages.length > 0
              ? el.userProfileImages[0].url
              : AvatarLarge
            : AvatarLarge;
          const isUrlImage = el.userProfileImages
            ? el.userProfileImages.length > 0
              ? true
              : false
            : false;
          return {
            id: el.id,
            info: {
              name: el.name ? el.name : "Gigi",
              gender: el.gender ? el.gender : "Male",
              occupation: "Student",
              budget: {
                min: 700,
                max: 1200,
              },
            },
            percentage: "20",
            imageBgColor:
              BG_COLORS[Math.floor(Math.random() * BG_COLORS.length)],
            badgeBgColor:
              BG_COLORS[Math.floor(Math.random() * BG_COLORS.length)],
            badgetext: "PikeMe",
            progress: 15,
            image: profileImage,
            isUrlImage,
          };
        });
        await setCarouselData(newCarouselData);
      }
    })();
  }, [usersList]);

  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused
      (async function () {
        dispatch(ACTIONS.setIsLoadingFalse());
        await getUsersListData();
      })();

      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [])
  );

  const getUsersListData = async () => {
    dispatch(ACTIONS.setIsLoadingTrue());
    const result = await dispatch(ACTIONS.fetchUsersListData());
    dispatch(ACTIONS.setIsLoadingFalse());
    if (!result.success) {
      Alert.alert(
        "Error",
        result.message
          ? result.message
          : "Error occured while processing request, try again!",
        [{ text: "OKAY" }]
      );
    }
  };

  const changeFiltersModalVisibility = (status) => {
    setShowFiltersModal(status);
  };

  const openUserDetailPage = (itemData) => {
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
            renderItem={(data) => (
              <UserListItem
                item={data.item}
                onPress={(item) => openUserDetailPage(item)}
              />
            )}
            data={carouselData}
            // firstItem={0}
            layout={"default"}
            enableMomentum={true}
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
