// Core Imports
import React, { useReducer, useEffect } from "react";
import { StyleSheet, View, FlatList, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Custom Imports
import * as CONFIG from "../../config";
import BodyText from "../BodyText";
import ModalCon from "../ModalCon";

// **********************************************************
// Action Types
const ITEM_STATUS_CHANGED = "ITEM_STATUS_CHANGED";

// Modal State Reducer
const MODAL_STATE_REDUCER = (state, action) => {
  switch (action.type) {
    case ITEM_STATUS_CHANGED:
      const itemsClone = [...state.items];
      itemsClone[action.index].checked = !action.checked; // because this "action.checked" will hold last value of item checked status so we need to store new opposite value
      return {
        ...state,
        items: itemsClone,
      };
    default:
      return state;
  }
};

const SelectOptionsModal = (props) => {
  useEffect(() => {
    if (
      (!props.id,
      !props.items,
      !props.title,
      !props.closeModal,
      !props.onFinish)
    ) {
      alert(
        "required props missing, props required are id, items, title, closeModal, onFinish, kindly pass all required props to continue!"
      );
      return;
    }
  }, []);

  const MODAL_INIT_STATE = {
    items: props.items,
  };

  const [modalState, dispatchModalState] = useReducer(
    MODAL_STATE_REDUCER,
    MODAL_INIT_STATE
  );

  const onFinishHandler = () => {
    if (props.onFinish) {
      const data = {
        id: props.id,
        value: modalState.items,
        isvalid: true,
      };
      props.onFinish(data);
    } else {
      alert("pass 'onFinish' props");
    }
  };

  const modalCloseHandler = () => {
    if (props.closeModal) {
      props.closeModal();
    } else {
      alert("pass 'closeModal' props");
    }
  };

  const itemClickHandler = (data) => {
    dispatchModalState(data);
  };

  return (
    <ModalCon
      style={{ ...STYLES.main, ...props.style }}
      visible={props.visible}
    >
      <View style={STYLES.header}>
        <TouchableOpacity onPress={modalCloseHandler}>
          <Ionicons
            style={STYLES.backIcon}
            name="chevron-back"
            size={24}
            color={CONFIG.GREY}
          />
        </TouchableOpacity>
        <BodyText style={STYLES.modalTitle}>{props.title}</BodyText>
        <TouchableOpacity onPress={onFinishHandler}>
          <BodyText style={STYLES.doneText}>
            <Ionicons name="checkmark" size={26} />
          </BodyText>
        </TouchableOpacity>
      </View>
      <View style={STYLES.addNewCon}>
        <View style={STYLES.addNew_leftSide}>
          <View style={STYLES.addNewIconCon}>
            <Ionicons
              style={STYLES.addNewIcon}
              size={24}
              name="add"
              color={CONFIG.BLACK}
            />
          </View>
          <BodyText style={STYLES.addNewText}>Create my own Tab</BodyText>
        </View>
        <Ionicons
          name="chevron-forward"
          size={20}
          color={CONFIG.GREY}
          style={STYLES.addNewForwardIcon}
        />
      </View>
      <View style={STYLES.itemsList}>
        <FlatList
          style={STYLES.list}
          data={modalState.items}
          renderItem={(itemData) => {
            // console.log("SelectOptionsModal === FlatList == res = ", {
            //   itemData,
            // });
            return (
              <TouchableOpacity
                style={STYLES.itemCon}
                onPress={() =>
                  itemClickHandler({
                    type: ITEM_STATUS_CHANGED,
                    index: itemData.index,
                    checked: itemData.item.checked,
                  })
                }
              >
                <View style={STYLES.item}>
                  <BodyText
                    style={{
                      ...STYLES.itemText,
                      ...{
                        fontFamily: itemData.item.checked
                          ? CONFIG.FONT_RUBIK_MEDIUM
                          : CONFIG.FONT_RUBIK_REGULAR,
                      },
                    }}
                  >
                    {itemData.item.value}
                  </BodyText>
                  {itemData.item.checked && (
                    <Ionicons
                      style={STYLES.itemIcon}
                      name="checkmark"
                      size={30}
                      color={CONFIG.PRIMARY}
                    />
                  )}
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </ModalCon>
  );
};

const STYLES = StyleSheet.create({
  main: {},
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 20,
    paddingHorizontal: 16,
  },
  backIcon: {},
  modalTitle: {
    fontFamily: CONFIG.FONT_RUBIK_BOLD,
    fontSize: 18,
  },
  doneText: {
    fontSize: 16,
  },
  addNewCon: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    borderBottomColor: CONFIG.BORDER_COLOR_LIGHT,
    borderBottomWidth: 1,
    marginBottom: 20,
    marginTop: 20,
    paddingBottom: 10,
  },
  addNew_leftSide: {
    flexDirection: "row",
    alignItems: "center",
  },
  addNewText: {
    fontFamily: CONFIG.FONT_RUBIK_MEDIUM,
    fontSize: 18,
    marginLeft: 10,
  },
  addNewIconCon: {
    backgroundColor: CONFIG.LIGHT_TEXT_COLOR,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    width: 30,
    height: 30,
  },
  addNewIcon: {},
  addNewForwardIcon: {},
  itemsList: {
    paddingHorizontal: 20,
  },
  list: {
    width: "100%",
  },
  itemCon: {},
  item: {
    borderBottomWidth: 1,
    borderBottomColor: CONFIG.BORDER_COLOR_LIGHT,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    minHeight: 40,
  },
  itemText: {},
  itemIcon: {
    fontWeight: "900",
  },
});

export default SelectOptionsModal;
