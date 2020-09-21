import React from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Dimensions } from "react-native";

const {height} = Dimensions.get("window")

export const walletIcon = <Icon name="account-balance-wallet" size={height / 27} color="gray" />
export const articleIcon = <Icon name="subject" size={height / 27} color="gray" />
export const bookmarksIcon = <Icon name="bookmark" size={height / 27} color="gray" />
export const clearIcon = <Icon name="clear" size={height / 30} color="gray" />
export const saveIcon = <Icon name="save" size={height / 40} color="#fff" />
///////
export const DrawerIcon = <Icon name="dehaze" size={height / 25} color="#fff" /> 
export const addIcon = <Icon name="add" size={height / 25} color="#fff" /> 
export const createIcon = <Icon name="create" size={height / 60} color="#fff" />
/////
export const white_keyboard_backspaceIcon = <Icon name="keyboard-backspace" size={height / 28} color="#fff" />
export const keyboard_backspaceIcon = <Icon name="keyboard-backspace" size={height / 28} color="#000" />
export const keyboard_backspaceIconWhite = <Icon name="keyboard-backspace" size={height / 25} color="#fff" /> 
export const more_vertIcon = <Icon name="more-vert" size={height / 28} color="#000" />
export const save_altIcon = <Icon name="move-to-inbox" size={height / 25} color="#fff" /> 
///////
export const keyboard_arrow_downIcon = <Icon name="keyboard-arrow-down" size={height / 25} color="gray" /> 
export const keyboard_arrow_upIcon = <Icon name="keyboard-arrow-up" size={height / 25} color="gray" /> 
export const deleteIcon = <Icon name="delete" size={height / 40} color="#fff" /> 